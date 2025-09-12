---
layout: main
title: About Me
permalink: /aboutme
---

# About Me

## My Story

I have a unique background that combines advanced computational physics with practical applications in quantitative finance. My journey began with a fascination for understanding the fundamental behavior of quantum matter, which led me through a PhD at UNC-Chapel Hill where I developed novel computational methods for quantum many-body systems.

Today, as a **Quantitative Analytics Specialist at Wells Fargo**, I apply the same analytical rigor and computational expertise to solve complex financial challenges. I bridge the gap between cutting-edge research methodologies and real-world business solutions, transforming theoretical insights into practical applications that drive business value.

## Skills at a Glance

<div class="skills-overview">
  <div class="skills-column">
    <div class="skill-group">
      <h4>💻 Programming & Development</h4>
      <div class="skill-items">
        <span class="skill-primary">Python</span>
        <span class="skill-primary">C++</span>
        <span class="skill-primary">SQL</span>
        <span class="skill-secondary">JavaScript</span>
        <span class="skill-secondary">Fortran</span>
      </div>
    </div>
    
    <div class="skill-group">
      <h4>🏦 Financial Technology</h4>
      <div class="skill-items">
        <span class="skill-primary">Risk Modeling</span>
        <span class="skill-primary">FRTB SA</span>
        <span class="skill-primary">ISDA SIMM</span>
        <span class="skill-secondary">Derivatives Pricing</span>
        <span class="skill-secondary">VaR Modeling</span>
      </div>
    </div>
  </div>
  
  <div class="skills-column">
    <div class="skill-group">
      <h4>📊 Data Science & Analytics</h4>
      <div class="skill-items">
        <span class="skill-primary">Pandas</span>
        <span class="skill-primary">NumPy</span>
        <span class="skill-primary">Prophet</span>
        <span class="skill-secondary">LightGBM</span>
        <span class="skill-secondary">statsmodels</span>
      </div>
    </div>
    
    <div class="skill-group">
      <h4>🎨 Visualization & UI</h4>
      <div class="skill-items">
        <span class="skill-primary">Dash</span>
        <span class="skill-primary">Plotly</span>
        <span class="skill-secondary">Matplotlib</span>
        <span class="skill-secondary">Seaborn</span>
      </div>
    </div>
  </div>
</div>

<style>
.skills-overview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  margin: var(--space-8) 0;
  padding: var(--space-8);
  background: linear-gradient(135deg, var(--gray-50) 0%, var(--bg-surface) 100%);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--gray-200);
  position: relative;
}

.skills-overview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, var(--gray-300), transparent);
}

.skills-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.skill-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skill-group h4 {
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: flex-start;
}

.skill-primary, .skill-secondary {
  display: inline-block;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius);
  font-size: var(--font-size-xs);
  font-weight: 500;
  transition: all var(--duration-fast) var(--easing-smooth);
  white-space: nowrap;
}

.skill-primary {
  background: var(--color-primary);
  color: white;
  border: 1px solid var(--color-primary);
}

.skill-secondary {
  background: var(--gray-200);
  color: var(--text-primary);
  border: 1px solid var(--gray-300);
}

.skill-primary:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.skill-secondary:hover {
  background: var(--gray-300);
  border-color: var(--gray-400);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 768px) {
  .skills-overview {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    padding: var(--space-6);
  }
  
  .skills-overview::before {
    display: none;
  }
  
  .skills-column {
    gap: var(--space-5);
  }
  
  .skill-group h4 {
    font-size: var(--font-size-sm);
  }
  
  .skill-items {
    gap: var(--space-1);
  }
  
  .skill-primary, .skill-secondary {
    font-size: 10px;
    padding: var(--space-1) var(--space-2);
  }
}
</style>

## Education

- PhD in Physics, **University of North Carolina - Chapel Hill** <span style="float:right;"> _Aug 2016_ to _May 2022_ </span>
- Visiting Student in Physics, **Duke University** <span style="float:right;"> *Aug 2013* to *Aug 2014* </span>
- B.S in Physics, **Shandong University** <span style="float:right;"> *Sep 2011* to *Jun 2015* </span>


## Professional Journey

<div class="journey-section">
  <h4>🏢 Current Role</h4>
  <p><strong>Quantitative Analytics Specialist</strong> at Wells Fargo, leading development of Python-based risk analytics frameworks, designing regulatory compliance models (FRTB SA, ISDA SIMM), and building interactive dashboards for stakeholders. I lead cross-functional teams and present analytics to senior management.</p>
  <a href="/professional" class="section-link">View Professional Experience →</a>
</div>

<div class="journey-section">
  <h4>🎓 Academic Contributions</h4>
  <p><strong>Computational Physics Research</strong> focused on quantum many-body systems, developing the "Automated Algebra Method" that eliminates statistical errors in quantum calculations. Published 6+ peer-reviewed papers including an Editor's Suggestion in Physical Review Letters.</p>
  <a href="/research" class="section-link">View Academic Work →</a>
</div>

<style>
.journey-section {
  margin: var(--space-8) 0;
  padding: var(--space-6);
  background: var(--bg-surface);
  border-radius: var(--border-radius-lg);
  border-left: 4px solid var(--color-accent);
  position: relative;
}

.journey-section h4 {
  margin-bottom: var(--space-3);
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.journey-section p {
  margin-bottom: var(--space-4);
  color: var(--text-secondary-dark);
  line-height: 1.6;
}

.section-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--font-size-sm);
  transition: all var(--duration-fast) var(--easing-smooth);
}

.section-link:hover {
  color: var(--color-primary-dark);
  transform: translateX(4px);
}
</style>

## Beyond Work

When I'm not developing analytical models or researching quantum systems, I'm passionate about the intersection of technology and problem-solving. I enjoy exploring how computational methods can be applied to diverse domains, from physics simulations to financial modeling.

My approach to both research and industry work is driven by a curiosity to understand complex systems and a commitment to developing elegant, practical solutions.

