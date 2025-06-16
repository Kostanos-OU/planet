// scripts/index4.js

import Gl from './gl/index.js';
import Blob from './gl/Blob.js';
import gsap from 'gsap';

class App {
  constructor() {
    this.blobs = [];
    this.addBlobs();

    // Main timeline: content animation + grow animation
    this.tl = gsap.timeline({ delay: 0.25 })
      .add(this.article())
      .add(this.growBlob(), '-=1.5');
  }

  addBlobs() {
    // Create the “rightmost” blob with its original params
    const blob = new Blob(
      3,      // size
      0.3,    // speed
      0.25,   // color
      2.0,    // freq
      0.15,   // density
      Math.PI // strength/offset
    );
    blob.position.set(0, 0, 0);

    // Start at ~10px size: tiny scale (will grow to scale=1)
    blob.scale.set(0.01, 0.01, 0.01);

    Gl.scene.add(blob);
    this.blobs = [blob];
  }

  article() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    const content = document.querySelector('.content span');
    const contentClip = { x: 0 };

    tl
      .from('.title div, .subtitle div', {
        duration: 2,
        xPercent: -100,
      })
      .from('.menu__inner-translate', {
        duration: 1.5,
        yPercent: -100,
      }, '-=1.5')
      .to(contentClip, {
        duration: 1.5,
        x: 100,
        onUpdate: () => {
          content.style.setProperty('--clip', `${contentClip.x}%`);
        },
      }, '-=1.25')
      .from('.play', {
        duration: 1,
        scale: 0,
        rotate: '-62deg',
      }, '-=1.5');

    return tl;
  }

  growBlob() {
    // Animate scale from 0.01 → 1 over 3 seconds
    const scale = this.blobs[0].scale;
    return gsap.timeline()
      .to(scale, {
        duration: 3,
        x: 1,
        y: 1,
        z: 1,
        ease: 'power3.inOut'
      });
  }
}

new App();