class Particle {
  constructor(canvas, radius, speed, color, factor, offset) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = this.random(canvas.width);
    this.y = this.random(canvas.height);
    this.offset = offset || 0;
    this.radius = this.random(radius, radius / 2);
    this.color = color;
    this.speed = speed;
    this.vector = {
      x: this.random(factor * 2, -factor),
      y: this.random(factor * 2, -factor),
    };
  }

  random(max, min) {
    return Math.random() * max + (min || 0);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  updatePosition() {
    if (this.y > this.canvas.height + this.offset || this.y < 0 - this.offset)
      this.vector.y *= -1;
    if (this.x > this.canvas.width + this.offset || this.x < 0 - this.offset)
      this.vector.x *= -1;
    this.y += this.speed * this.vector.y;
    this.x += this.speed * this.vector.x;
  }
}

class ParticlesAnimation {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.config = config;
    this.particles = [];
    this.animate = this.animate.bind(this);
    this.animation = { pause: false, request: null };
  }

  init() {
    window.addEventListener("resize", ({ target }) => {
      this.updateCanvasSize(target.innerWidth * 0.6, target.innerHeight);
    });
    this.updateCanvasSize(window.innerWidth * 0.6, window.innerHeight);
    this.createParticles();
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.particles.forEach((particle) => {
      this.updateConnections(particle);
    });
    this.animation.request = window.requestAnimationFrame(this.animate);
  }

  updateParticles() {
    this.particles.forEach((particle) => {
      particle.updatePosition();
      particle.draw();
    });
  }

  updateConnections(currentParticle) {
    this.particles.forEach((particle) => {
      const distance = this.calculateDistance(currentParticle, particle);
      if (distance > this.config.connectionDistance) return;
      this.drawConnection(currentParticle, particle, distance);
    });
  }

  drawConnection(particle1, particle2, distance) {
    const opacityValue = 1 - distance / this.config.opacity;
    this.ctx.strokeStyle = `rgba(255,255,255,${opacityValue})`;
    this.ctx.beginPath();
    this.ctx.moveTo(particle1.x, particle1.y);
    this.ctx.lineTo(particle2.x, particle2.y);
    this.ctx.stroke();
  }

  calculateDistance(particle1, particle2) {
    const dx = Math.abs(particle1.x - particle2.x);
    const dy = Math.abs(particle1.y - particle2.y);
    return Math.sqrt(dx * dx + dy * dy);
  }

  createParticles() {
    const { quantity, radius, speed, color, factor, offset } = this.config;
    for (let i = 0; i < quantity; i++) {
      this.particles.push(
        new Particle(this.canvas, radius, speed, color, factor, offset)
      );
    }
  }

  updateCanvasSize(width, height) {
    this.canvas.height = height;
    this.canvas.width = width;
  }
}

export default ParticlesAnimation;
