class Food {
    constructor() {
      this.x = floor(random(width / scl)) * scl;
      this.y = floor(random(height / scl)) * scl;
      for (let i = snake.tail.length-1; i >=0 ;i--) {
        if (snake.tail[i].x === this.x && snake.tail[i].y === this.y) {
          this.x = floor(random(width / scl)) * scl;
          this.y = floor(random(height / scl)) * scl;
        }
      }
    }
  
    update() {
      this.x = floor(random(width / scl)) * scl;
      this.y = floor(random(height / scl)) * scl;
      for (let i = 0; i < snake.tail.length; i++) {
        if (snake.tail[i].x === this.x && snake.tail[i].y === this.y) {
          this.x = floor(random(width / scl)) * scl;
          this.y = floor(random(height / scl)) * scl;
        }
      }
    }
  
    show() {
      stroke(0)
      fill("orange");
      rect(this.x, this.y, scl, scl,(1/5)*scl);
    }
  }

  class BonusFood {
    constructor() {
      this.lifespan=4000;
      this.x = floor(random(width / scl)) * scl;
      this.y = floor(random(height / scl)) * scl;
      for (let i = snake.tail.length-1; i >=0 ;i--) {
        if (snake.tail[i].x === this.x && snake.tail[i].y === this.y) {
          this.x = floor(random(width / scl)) * scl;
          this.y = floor(random(height / scl)) * scl;
        }
      }
      this.expirationTime = millis() + this.lifespan; // bonus food lasts for 4 seconds
    }
  
    update() {
      if (millis() > this.expirationTime || snake.eat(bonusFood, "bonus")) {
        bonusFood = null; // delete the BonusFood object
      }
    }
  
    show() {
      stroke(0)
      fill("rgb(58,206,58)");
      rect(this.x, this.y, scl, scl,(1/5)*scl);
      let x = constrain(this.expirationTime-millis(),0,this.expirationTime)/1000;
      fill("red");
      textSize(12);
      stroke(0,0,0);
      let ang = map(x,0,this.lifespan/1000,0,TWO_PI);
      arc(this.x+(scl/2), this.y+(scl/2), (0.75*scl), (0.75*scl), 0,ang,PIE);
    }
  }
