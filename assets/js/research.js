(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.research-stage').forEach(stage => {
    const circles = [...stage.querySelectorAll('circle')];
    const paths = [...stage.querySelectorAll('path')];
    const originalPaths = paths.map(path => path.getAttribute('d'));
    const bodies = circles.map(circle => ({
      x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')),
      fromX: 0, fromY: 0, toX: 0, toY: 0, elapsed: 0, duration: 0,
    }));
    const waves = stage.classList.contains('research-waves');
    let hovered = false;
    let visible = true;
    let active = false;
    let frame = 0;
    let last = 0;
    let phase = 0;
    let strength = 0;

    function reset() {
      cancelAnimationFrame(frame);
      frame = last = phase = strength = 0;
      circles.forEach((circle, i) => {
        circle.setAttribute('cx', bodies[i].x);
        circle.setAttribute('cy', bodies[i].y);
      });
      paths.forEach((path, i) => path.setAttribute('d', originalPaths[i]));
      bodies.forEach(body => {
        body.fromX = body.fromY = body.toX = body.toY = body.elapsed = body.duration = 0;
      });
    }

    function animate(time) {
      const dt = last ? Math.min(time - last, 50) : 16.7;
      last = time;
      strength += ((active ? 1 : 0) - strength) * (1 - Math.exp(-dt / 140));
      if (!active && strength < .001) { reset(); return; }
      if (bodies.length) {
        const positions = bodies.map((body, i) => {
          if (body.elapsed >= body.duration) {
            body.fromX = body.toX;
            body.fromY = body.toY;
            body.toX = (Math.random() - .5) * 18;
            body.toY = (Math.random() - .5) * 14;
            body.elapsed = 0;
            body.duration = 1200 + Math.random() * 1400;
          }
          body.elapsed = Math.min(body.elapsed + dt, body.duration);
          const t = body.elapsed / body.duration;
          // Smooth random waypoints: no sudden changes in velocity or acceleration.
          const ease = t * t * t * (t * (t * 6 - 15) + 10);
          const x = body.x + (body.fromX + (body.toX - body.fromX) * ease) * strength;
          const y = body.y + (body.fromY + (body.toY - body.fromY) * ease) * strength;
          circles[i].setAttribute('cx', x.toFixed(2));
          circles[i].setAttribute('cy', y.toFixed(2));
          return `${x.toFixed(2)} ${y.toFixed(2)}`;
        });
        paths[0].setAttribute('d', `M${positions.join(' L')} Z`);
      } else if (waves) {
        phase = (phase + dt * .0018) % (Math.PI * 2);
        paths.forEach((path, line) => {
          let d = '';
          for (let point = 0; point <= 60; point++) {
            const angle = point * Math.PI / 30 + line * 1.1;
            const rest = Math.sin(angle);
            const y = 24 + line * 12 + 9 * (rest + (Math.sin(angle - phase) - rest) * strength);
            d += `${point ? 'L' : 'M'}${20 + point * 2},${y.toFixed(2)} `;
          }
          path.setAttribute('d', d.trim());
        });
      }
      frame = requestAnimationFrame(animate);
    }

    function sync() {
      const allowed = visible && !document.hidden && !reducedMotion.matches;
      active = allowed && (hovered || stage.matches(':focus-visible'));
      stage.classList.toggle('is-animating', active);
      if (!allowed) { reset(); return; }
      // Algebra flows in CSS; only moving geometry needs animation frames.
      if ((bodies.length || waves) && !frame && active) frame = requestAnimationFrame(animate);
    }
    stage.addEventListener('pointerenter', event => { hovered = event.pointerType !== 'touch'; sync(); });
    stage.addEventListener('pointerleave', () => { hovered = false; sync(); });
    stage.addEventListener('pointercancel', () => { hovered = false; sync(); });
    stage.addEventListener('focus', sync);
    stage.addEventListener('blur', sync);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(stage);
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', sync);
    addEventListener('pagehide', () => { active = false; stage.classList.remove('is-animating'); reset(); });
    addEventListener('pageshow', sync);
  });
})();
