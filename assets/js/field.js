(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.querySelector('#interference-field');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const desktopWidth = matchMedia('(min-width: 901px)');
  const coarsePointer = matchMedia('(pointer: coarse)');
  let width = 0;
  let height = 0;
  let paths = [];
  let strands = [];
  let frame = 0;
  let last = 0;
  let phase = 0;
  let visible = true;
  let ink;
  let accent;
  const pointer = { x: 0, y: 0, previousX: 0, previousY: 0, active: false };

  function showArtwork() { return desktopWidth.matches && !coarsePointer.matches; }
  function canDraw() {
    return showArtwork() && visible && width > 0 && height > 0;
  }
  function canAnimate() { return canDraw() && !reducedMotion.matches; }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
  }
  function resetForce() {
    pointer.active = false;
    strands.forEach(strand => {
      for (const key of ['dx', 'dy', 'vx', 'vy']) strand[key].fill(0);
      strand.moving = false;
    });
    stop();
  }
  function palette() {
    const css = getComputedStyle(root);
    ink = css.getPropertyValue('--field-line').trim();
    accent = css.getPropertyValue('--field-accent').trim();
    draw();
  }
  function makePaths() {
    const scale = Math.min(width, height) * .40;
    // Cache the base geometry and harmonics; animate the threads, not the frame.
    paths = Array.from({ length: 46 }, (_, line) => {
      const u = line / 45;
      const rotation = -.45 + u * .35;
      return Array.from({ length: 210 }, (_, point) => {
        const t = point / 210 * Math.PI * 2;
        const radius = .64 + u * .35;
        const x = Math.sin(t) * radius + .16 * Math.sin(t * 3 + u * 3);
        const y = Math.cos(t) * radius * .88 + .2 * Math.sin(t * 2 + u * 4);
        return [
          width * .5 + (x * Math.cos(rotation) - y * Math.sin(rotation)) * scale,
          height * .51 + (x * Math.sin(rotation) + y * Math.cos(rotation)) * scale,
          Math.sin(t * 3 + u * 3), Math.cos(t * 3 + u * 3),
          Math.sin(t * 2 + u * 4), Math.cos(t * 2 + u * 4),
        ];
      });
    });
    strands = paths.map(() => ({
      ...Object.fromEntries(['x', 'y', 'dx', 'dy', 'vx', 'vy'].map(key => [key, new Float64Array(210)])),
      moving: false,
    }));
  }
  function draw(dt = 0) {
    if (!canDraw()) return;
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = .85;
    const scale = Math.min(width, height) * .40;
    const radius = Math.min(width, height) * .065;
    const radiusSquared = radius * radius;
    const contactLeft = Math.min(pointer.x, pointer.previousX) - radius;
    const contactRight = Math.max(pointer.x, pointer.previousX) + radius;
    const contactTop = Math.min(pointer.y, pointer.previousY) - radius;
    const contactBottom = Math.max(pointer.y, pointer.previousY) + radius;
    const xSin = Math.sin(phase), xCos = Math.cos(phase) - 1;
    const ySin = Math.sin(-phase * .8), yCos = Math.cos(-phase * .8) - 1;
    const sweepX = pointer.x - pointer.previousX;
    const sweepY = pointer.y - pointer.previousY;
    const sweepSquared = sweepX * sweepX + sweepY * sweepY;
    const speedScale = dt ? Math.min(1 / dt, 900 / (Math.sqrt(sweepSquared) || 1)) : 0;
    paths.forEach((path, line) => {
      const rotation = -.45 + line / 45 * .35;
      const cos = Math.cos(rotation), sin = Math.sin(rotation);
      const strand = strands[line];
      const { x, y, dx, dy, vx, vy } = strand;
      const count = path.length;
      path.forEach(([baseX, baseY, sx, cx, sy, cy], point) => {
        const waveX = .16 * (sx * xCos + cx * xSin) * scale;
        const waveY = .2 * (sy * yCos + cy * ySin) * scale;
        x[point] = baseX + waveX * cos - waveY * sin;
        y[point] = baseY + waveX * sin + waveY * cos;
      });
      // Damped springs hold the drifting shape; tension carries a touch along a strand.
      // Substeps keep the integration stable even when a frame arrives late.
      // Ambient drift never stops; sleeping springs need no integration until touched.
      const steps = pointer.active || strand.moving ? Math.ceil(dt * 120) : 0;
      const h = steps ? dt / steps : 0;
      for (let step = 0; step < steps; step++) {
        for (let i = 0; i < count; i++) {
          const prev = (i + count - 1) % count, next = (i + 1) % count;
          let ax = -55 * dx[i] + 450 * (dx[prev] + dx[next] - 2 * dx[i]) - 10 * vx[i];
          let ay = -55 * dy[i] + 450 * (dy[prev] + dy[next] - 2 * dy[i]) - 10 * vy[i];
          if (pointer.active) {
            const px = x[i] + dx[i], py = y[i] + dy[i];
            // Reject distant vertices before projection or square roots.
            if (px >= contactLeft && px <= contactRight && py >= contactTop && py <= contactBottom) {
              // Sweep the contact along the mouse's path so quick strokes cannot skip threads.
              const along = sweepSquared ? Math.max(0, Math.min(1,
                ((px - pointer.previousX) * sweepX + (py - pointer.previousY) * sweepY) / sweepSquared)) : 1;
              const rx = px - pointer.previousX - along * sweepX;
              const ry = py - pointer.previousY - along * sweepY;
              const distanceSquared = rx * rx + ry * ry;
              if (distanceSquared < radiusSquared) {
                const distance = Math.sqrt(distanceSquared);
                const tx = x[next] - x[prev], ty = y[next] - y[prev];
                const length = Math.hypot(tx, ty) || 1;
                const nx = -ty / length, ny = tx / length;
                const normalSpeed = (sweepX * nx + sweepY * ny) * speedScale;
                const side = Math.sign(rx * nx + ry * ny) || Math.sign(normalSpeed) || 1;
                const contact = 1 - distance / radius;
                // Push across the thread, not radially through an image-like lens.
                const force = side * 180 * radius * contact * contact + normalSpeed * 12 * contact;
                ax += nx * force;
                ay += ny * force;
              }
            }
          }
          vx[i] += ax * h;
          vy[i] += ay * h;
        }
        for (let i = 0; i < count; i++) { dx[i] += vx[i] * h; dy[i] += vy[i] * h; }
      }
      if (steps) {
        strand.moving = false;
        for (let i = 0; i < count; i++) {
          if (Math.abs(dx[i]) > .001 || Math.abs(dy[i]) > .001 || Math.abs(vx[i]) > .01 || Math.abs(vy[i]) > .01) {
            strand.moving = true;
            break;
          }
        }
        if (!strand.moving) { dx.fill(0); dy.fill(0); vx.fill(0); vy.fill(0); }
      }
      ctx.strokeStyle = line > 36 ? accent : ink;
      ctx.globalAlpha = line > 36 ? .8 : .72;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const px = x[i] + dx[i], py = y[i] + dy[i];
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    });
  }
  function resize() {
    resetForce();
    if (!showArtwork()) {
      width = height = 0;
      paths = [];
      strands = [];
      // Release the backing surface when the artwork is hidden.
      canvas.width = canvas.height = 0;
      return;
    }
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makePaths();
    draw();
    wake();
  }
  function animate(time) {
    frame = 0;
    if (!canAnimate()) return;
    const elapsed = last ? time - last : 16.7;
    const dt = Math.min(elapsed, 50) / 1000;
    last = time;
    phase = (phase + elapsed * .00016) % (Math.PI * 10);
    draw(dt);
    pointer.previousX = pointer.x;
    pointer.previousY = pointer.y;
    frame = requestAnimationFrame(animate);
  }
  function wake() {
    if (!frame && canAnimate()) frame = requestAnimationFrame(animate);
  }
  canvas.addEventListener('pointermove', (event) => {
    if (!canAnimate() || event.pointerType === 'touch') return;
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    if (!pointer.active) {
      pointer.previousX = pointer.x;
      pointer.previousY = pointer.y;
    }
    pointer.active = true;
    wake();
  });
  function release() { pointer.active = false; wake(); }
  canvas.addEventListener('pointerleave', release);
  canvas.addEventListener('pointercancel', release);
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) resetForce();
    else { draw(); wake(); }
  }).observe(canvas);
  document.addEventListener('visibilitychange', release);
  addEventListener('blur', release);
  addEventListener('focus', wake);
  addEventListener('pagehide', resetForce);
  addEventListener('pageshow', () => { resetForce(); draw(); wake(); });
  document.addEventListener('themechange', palette);
  reducedMotion.addEventListener('change', () => { resetForce(); draw(); wake(); });
  desktopWidth.addEventListener('change', resize);
  coarsePointer.addEventListener('change', resize);
  palette();
  resize();
})();
