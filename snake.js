class Snake {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.xv = 1;
      this.yv = 0;
      this.pv = createVector(1, 0);
      this.tot = 0;
      this.tail = [];
    }
  
    eat(f, type) {
      let r = random(1);
      let d = dist(this.x, this.y, f.x, f.y);
      let j = this.tot / 100;
      if (d < 1) {
        if (type === "normal") {
          this.tot++;
          if(playsound){
            eatfsound()
            }
          this.tail.push(
            createVector(floor(this.x / scl) * scl, floor(this.y / scl) * scl)
          );
          score++;
        } else if (type === "bonus") {
          if (r < 0.01 + j) {
            this.tot = Math.max(0, this.tot - 10);
            score += 100;
            if(playsound){
              eatbf.setVolume(0.3)
              eatbf.play()
            }
          } else {
            this.tot = Math.max(0, this.tot - 2);
            if(playsound){
              eatbf.setVolume(0.3)
              eatbf.play()
            }
          }
        }
        return true;
      } else {
        return false;
      }
    }
  
    dir(x, y) {
      if (this.pv.x === 0 && x !== 0) {
        this.xv = x;
        this.yv = 0;
      } else if (this.pv.y === 0 && y !== 0) {
        this.xv = 0;
        this.yv = y;
      }
      this.pv = createVector(x, y);
    }
  
     update() {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
      this.tail[this.tot - 1] = createVector(this.x, this.y);
      if (this.tail.length > this.tot) {
        this.tail.splice(0, this.tail.length - this.tot);
      }
  
      if(wall){
        this.x += this.xv * scl;
        this.y += this.yv * scl;
        if (this.x < 0 || this.x > width - scl || this.y < 0 || this.y > height - scl) {
          gameOver = true;
        }
      }
      else{
        
        this.x = (this.x + this.xv * scl) % width;
        if (this.x < 0) this.x = width - scl;
       
        this.y = (this.y + this.yv * scl) % height;
        if (this.y < 0) this.y = height - scl;
      }
  
      if (this.xv !== 0 && this.yv !== 0) {
        this.xv = 0;
        this.yv = 0;
      }
      for (let i = 0; i < this.tail.length; i++) {
        if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
          gameOver = true;
        }
      }
    }
    show() {
      fill(255);
      stroke(0)
      for (let i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl,(1/5)*scl);
      }
      rect(this.x, this.y, scl, scl,(1/5)*scl);
    }
  }
