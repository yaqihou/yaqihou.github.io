---
layout: main
title: Research (WIP)
tag_published: <span class="mytag tag_done">published</span>
tag_ongoing: <span class="mytag tag_doing">ongoing</span>
tag_unpub: <span class="mytag tag_drop">unpublished</span>
tag_hold: <span class="mytag tag_drop">on hold</span>
tag_undergrad: <span class="mytag tag_drop">undergraduate</span>
---
<div id="toc_wrap">
<div id="toc"> 
    Table of Contents
<div id="toc_full" markdown="1">
* toc
{:toc}
</div>
</div>
</div>

<div>

During my PhD years, I explored many projects in both
<strong>physics</strong> and <strong>computer science</strong>. Some of
them works and successfully materilized as publications or reports, but
more, if not most, of them ended up as internal notes, unpublished (and may
never will be) manuscripts, or just sunk under layers and layers of
folders. Even so, the ideas or the intermediate results are sometime
interesting and may deserve some sunlight.

<br>
<br>

Therefore, here are a brief list of those worthnoting projects , no matter
if they are published or unpublished, succe. Each of them is given a color
tag to indicate their status. And you can also use the Table of Contents
tab on top for easier navigation.

</div>


# Research in Physics

My research focuses on computational aspects of the quantum many-body problem.


As part of my proposal, I am now working on two directions: 

## Automated Algebra Method

Most of my PhD research devotes to an novel, semi-classical method coined
as Automated Algebra (AA) method. This idea roots from the work of my
advisor Joaquin Drut and his student Christoper Shill in their publication
[](). They explored only the leading-order calculation and .

I took over this method in my third year and has beening working on developing both its formalism and implementation since then.

Below, I describet

### Virial Coefficient Calculation {{ page.tag_published }}

![Fourth and fifth order](/assets/img/prl_plot.png){: style="float: left; height:240px; margin-right: 2em"}

Besides the two wosk  of papers in this direction verifies the applicability of our method in different systems: we apply it  


stars
- Phys. Rev. Research 3, 033099 (2021)

<div style="clear:both"></div>

### Thermaldynamics and Tan's contant in different systems {{ page.tag_published }}

### Search for pseudogap regime in the Unitary Fermi Gas {{ page.tag_published }}

In this collaboration with the
[group](https://theorie.ikp.physik.tu-darmstadt.de/fermions/people_braun.html)
from TU Darmsdadt, in Germany, we studied the paring behaviour of the
Unitary Fermi Gas in the normal phase, looking for signatures of 

My work in this paper served as a benchmark for the results from conventional stochastic methods. Crucially, my results are smooth functions, as they are analytic expressions, and not only validate but also extend the stochastic results, which are discrete.

### Static and Dynamic Structure Factor for Neutron Matter {{ page.tag_ongoing }}

In this project, I keep exploring the generalization of AA method. 

With an acceptable error from the finite-range interaction, the dilute
neutron matter can be approximated by the Unitary Fermi Gas under some
conditions.

### Dilute Neutron Matter with Finite-Range Interaction {{ page.tag_ongoing }}

Dilute neutron matter, as in the crust of a neutron star, belongs to the same universal class as 

## Stochastic Method

### Quantum Monte Carlo in 2D Trapped System <span class="mytag tag_drop">unpublished</span>

### Energy of bosonic droplets <span class="mytag tag_drop">unpublished</span>

### Enhanced Linear Solver for Complex Langevin Method <span class="mytag tag_doing">ongoing</span>

### Machine-learning based random field generator <span class="mytag tag_doing">early stage</span>


# Projects in Computer Science

As a personal interest, I conducted a few research projects in computer science, 

### Quantum matter map {{ page.tag_ongoing }}

### Enhanced attention mechanism using CNN {{ page.tag_hold }}

In this project, I aimed to explore 

### COVID-19 event extraction from noisy tweets {{ page.tag_published }}

# Undergraduate Research

### Numerical Simulation of Acoustic Field {{ page.tag_undergrad }}

This project is for my undergraduate thesis

### Flow of Granular Material in 2D Hopper {{ page.tag_undergrad }}

{% include image.html url="assets/img/photoelastic.png" description="Image credit: Wikipedia" height="160px" %}

In my junior year, I had a chance to study at Duke University for one year
(2013-2014), as part of a exchange program between Taishan College,
Shandong University and Duke University. I am very honored to be able to
worked in Prof. Robert Behringer's group for undergraduate research,
co-mentored by him and Dr. Joshua Dijksman, a then-postdoc and
now-associate professor at Wegeningen University.

In the experiment, photoelastic disks were released in a 2D hopper, where
both the size of the opening and the angle of supporting walls are
controllable.
<!--  -->
Under deformation, the optical properties of photoelastic disks will change and
therefore, after passing through the polarizing filter.
<!--  -->
To that end, a polarized light source was placed behind the hopper and a
high-speed camera with polarizing filter in front, such that when a particle
is deformed, the intensity captured will change accordingly. Placed at a slighly different
angle in front of the hopper, a second camera without the filter was used to
take the normal picture in synchronization with the first one.

I did NOT participate in the experiment, which was performed by Dr. Junyao
Tang, who was a PhD student graduated in the previous year. My main job was two parts:
Firstly, I perform image registation to align the images from two cameras, and then apply
pattern recognization to the normal image to identify and locate each particle.

With these information, I can trace the particle in the polarized image,
and then reconstruct the force field, and more ideally the stress tensor,
for each of them. The latter part is difficult as the image contains only
the intensity information. Using a quantity coined as Moment of Intensity,
a different kind of MoI, which showed correlation to the stress tensor in a
benchmark experiment, we successfully approximated the force field.

### Experimental Study of Thermoelectric Material {{ page.tag_undergrad }}

I joined this project, which is also my first, during the second semester
of the sophomore year (Spring 2013), as part of the Undergraduate Research
Program. Suprevised by a PhD student Yi Li and his advisor Jian Liu, I
helped with the preparation of thermoelectric ceramics, performed X-Ray
Diffraction (XRD) measurements, and ran data analysis. I only participated
in the early stage of this project and the result was later published at
_Scripta Materialia, 109, 80-83 (2015)_.

<!-- My research focuses on numerical and analytical methods on quantum many-body problem, which is an essential  -->

<!-- My latest work is to develop an novel method to predict virial coefficients of interacting Fermi systems. This  -->
