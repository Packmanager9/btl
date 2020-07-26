
window.addEventListener('DOMContentLoaded', (event) =>{


    
    let enemyrate = 120
    let enemydamage = 5
    let enemyhealth = 100
    let enemyshieldcharge = 1
    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
        // console.log(keysPressed)
     });
     
     document.addEventListener('keyup', (event) => {
         delete keysPressed[event.key];
      });

    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"


    let flex = tutorial_canvas.getBoundingClientRect();

    // Add the event listeners for mousedown, mousemove, and mouseup
    let tip = {}
    let xs
    let ys
   
   
    
    window.addEventListener('mousedown', e => {

          flex = tutorial_canvas.getBoundingClientRect();
          xs = e.clientX - flex.left;
          ys = e.clientY - flex.top;
          tip.x = xs
          tip.y = ys
    
          tip.body = tip


          for(let t = 0; t<bottle.crew.length;t++){
              if(bottle.crew[t].statbox.isPointInside(tip)){
                  bottle.selectedcrew = t
              }
          }

          if(boxer.health > 0){
            //   boxer.body.y = -1000
              
        }else{
            if(continueButton.isPointInside(tip)){
                bottle.health = bottle.maxhealth
                for(let t = 0; t<bottle.crew.length; t++){
                    bottle.crew[t].health = bottle.crew[t].maxhealth
                }
                boxer = new EnemyShip()
                enemydamage += 1
                boxer.gun.damage+= enemydamage
                enemyrate-= Math.floor((Math.random())*10)+1
                if(enemyrate < 10){
                    enemyrate = 10
                }
                boxer.gun.rate = enemyrate
                boxer.gun.bulletsize = boxer.gun.damage/20
                enemyhealth+= Math.floor((Math.random())*10)+1
                boxer.maxhealth = enemyhealth
                enemyshieldcharge+=.05
                boxer.shieldrate = enemyshieldcharge
                boxer.health=boxer.maxhealth
                if(boxer.gun.bulletsize > 10){
                    boxer.gun.bulletsize  = 10
                }

                if(crewPlus == 1){

                    let crewman = new Crew(new Circle(bottle.helm.x+10, bottle.helm.y+10, 3, "black"))
                    bottle.crew.push(crewman)
                    bottle.organizeCrew()
                    crewPlus = 0
                }
                if(weaponUpgrade == 1){
                    bottle.gun.rate-= 11
                    bottle.gun.damage += 1
                    if(bottle.gun.rate<10){
                        bottle.gun.rate = 10
                    }
                    bottle.gun.bulletspeed+= .3
                    if(bottle.gun.bulletspeed >12){
                         bottle.gun.bulletspeed = 12
                    }
                    bottle.gun.bulletsize+= 1
                    weaponUpgrade = 0
                }
                if(hullUpgrade == 1){
                    bottle.maxhealth+=150
                    bottle.health = bottle.maxhealth
                    hullUpgrade = 0
                }
                if(shieldUpgrade == 1){
                    bottle.shieldchargerate += .33
                    shieldUpgrade = 0
                }
            }
        }



     });
    
    

    class Triangle{
        constructor(x, y, color, length){
            this.x = x
            this.y = y
            this.color= color
            this.length = length
            this.x1 = this.x + this.length
            this.x2 = this.x - this.length
            this.tip = this.y - this.length*2
            this.accept1 = (this.y-this.tip)/(this.x1-this.x)
            this.accept2 = (this.y-this.tip)/(this.x2-this.x)

        }

        draw(){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = 3
            tutorial_canvas_context.moveTo(this.x, this.y)
            tutorial_canvas_context.lineTo(this.x1, this.y)
            tutorial_canvas_context.lineTo(this.x, this.tip)
            tutorial_canvas_context.lineTo(this.x2, this.y)
            tutorial_canvas_context.lineTo(this.x, this.y)
            tutorial_canvas_context.stroke()
        }

        isPointInside(point){
            if(point.x <= this.x1){
                if(point.y >= this.tip){
                    if(point.y <= this.y){
                        if(point.x >= this.x2){
                            this.accept1 = (this.y-this.tip)/(this.x1-this.x)
                            this.accept2 = (this.y-this.tip)/(this.x2-this.x)
                            this.basey = point.y-this.tip
                            this.basex = point.x - this.x
                            if(this.basex == 0){
                                return true
                            }
                            this.slope = this.basey/this.basex
                            if(this.slope >= this.accept1){
                                return true
                            }else if(this.slope <= this.accept2){
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
    }


    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            if(this.width > 0 && this.height > 0){
                tutorial_canvas_context.fillStyle = this.color
                tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
            }
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
        isPointInsideGuy(point){
            if(point.x-point.radius >= this.x){
                if(point.y-point.radius >= this.y){
                    if(point.x+point.radius  <= this.x+this.width){
                        if(point.y+point.radius  <= this.y+this.height){
                        return true
                        }
                    }
                }
            }
            return false
        }
        isPointInside(point){
            if(point.x >= this.x){
                if(point.y >= this.y){
                    if(point.x <= this.x+this.width){
                        if(point.y <= this.y+this.height){
                        return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){

            this.height = 0
            this.width = 0
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.xrepel = 0
            this.yrepel = 0
            this.lens = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
        //    tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius*this.radius)){
                return true
            }
            return false
        }

        repelCheck(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius+point.radius)*(point.radius+this.radius)){
                return true
            }
            return false
        }
    }

    class CircleX{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){

            this.height = 0
            this.width = 0
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.xrepel = 0
            this.yrepel = 0
            this.lens = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius*this.radius)){
                return true
            }
            return false
        }

        repelCheck(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius+point.radius)*(point.radius+this.radius)){
                return true
            }
            return false
        }
    }

    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        hypotenuse(){
            let xdif = this.x1-this.x2
            let ydif = this.y1-this.y2
            let hypotenuse = (xdif*xdif)+(ydif*ydif)
            return Math.sqrt(hypotenuse)
        }
        draw(){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width
            tutorial_canvas_context.beginPath()
            tutorial_canvas_context.moveTo(this.x1, this.y1)         
            tutorial_canvas_context.lineTo(this.x2, this.y2)
            tutorial_canvas_context.stroke()
            tutorial_canvas_context.lineWidth = 1
        }
    }

    class Spring{
        constructor(body = 0){
            if(body == 0){
                this.body = new Circle(350, 350, 5, "red",10,10)
                this.anchor = new Circle(this.body.x, this.body.y+5, 3, "red")
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", 5)
                this.length = 1
            }else{
                this.body = body
                this.length = .1
                this.anchor = new Circle(this.body.x-((Math.random()-.5)*10), this.body.y-((Math.random()-.5)*10), 3, "red")
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", 5)
            }

        }
        balance(){
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", 5)

                if(this.beam.hypotenuse() !=0){
            if(this.beam.hypotenuse() < this.length){
                    this.body.xmom += (this.body.x-this.anchor.x)/(this.length)/300
                    this.body.ymom += (this.body.y-this.anchor.y)/(this.length)/300
                    this.anchor.xmom -= (this.body.x-this.anchor.x)/(this.length)/300
                    this.anchor.ymom -= (this.body.y-this.anchor.y)/(this.length)/300
            }else if(this.beam.hypotenuse() > this.length){
                    this.body.xmom -= (this.body.x-this.anchor.x)/(this.length)/300
                    this.body.ymom -= (this.body.y-this.anchor.y)/(this.length)/300
                    this.anchor.xmom += (this.body.x-this.anchor.x)/(this.length)/300
                    this.anchor.ymom += (this.body.y-this.anchor.y)/(this.length)/300
            }

        }

        let xmomentumaverage 
        let ymomentumaverage
        xmomentumaverage = ((this.body.xmom)+this.anchor.xmom)/2
        ymomentumaverage = ((this.body.ymom)+this.anchor.ymom)/2

                this.body.xmom = ((this.body.xmom)+xmomentumaverage)/2
                this.body.ymom = ((this.body.ymom)+ymomentumaverage)/2
                this.anchor.xmom = ((this.anchor.xmom)+xmomentumaverage)/2
                this.anchor.ymom = ((this.anchor.ymom)+ymomentumaverage)/2
        }
        draw(){
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", 5)
            this.beam.draw()
            this.body.draw()
            this.anchor.draw()
        }
        move(){
                    this.body.move()
                    this.anchor.move()
        }

    }


    class Observer{
        constructor(){
            this.body = new Circle( 500, 500, 5, "white")
            this.ray = []
            this.rayrange = 220
            this.globalangle = Math.PI
            this.gapangle = Math.PI/8
            this.currentangle = 0
            this.obstacles = []
            this.raymake = 40
        }

        beam(){
            this.currentangle  = this.gapangle/2
            for(let k = 0; k<this.raymake; k++){
                this.currentangle+=(this.gapangle/Math.ceil(this.raymake/2))
                let ray = new Circle(this.body.x, this.body.y, 1, "white",((this.rayrange * (Math.cos(this.globalangle+this.currentangle))))/this.rayrange*2, ((this.rayrange * (Math.sin(this.globalangle+this.currentangle))))/this.rayrange*2 )
                ray.collided = 0
                ray.lifespan = this.rayrange-1
                this.ray.push(ray)
            }
            for(let f = 3; f<this.rayrange/2; f++){
                for(let t = 0; t<this.ray.length; t++){
                    if(this.ray[t].collided < 1){
                        this.ray[t].move()
                    for(let q = 0; q<this.obstacles.length; q++){
                        if(this.obstacles[q].isPointInside(this.ray[t])){
                            this.ray[t].collided = 1
                        }
                      }
                    }
                }
            }
        }

        draw(){
            this.beam()
            this.body.draw()
            tutorial_canvas_context.lineWidth = 1
            tutorial_canvas_context.fillStyle = "red"
            tutorial_canvas_context.strokeStyle = "red"
            tutorial_canvas_context.beginPath()
            tutorial_canvas_context.moveTo(this.body.x, this.body.y)
            for(let y = 0; y<this.ray.length; y++){
                    tutorial_canvas_context.lineTo(this.ray[y].x, this.ray[y].y)
                        tutorial_canvas_context.lineTo(this.body.x, this.body.y)
                }
            tutorial_canvas_context.stroke()
            tutorial_canvas_context.fill()
            this.ray =[]
        }

        control(){
            if(keysPressed['t']){
                this.globalangle += .05
            }
            if(keysPressed['r']){
                this.globalangle -= .05
            }
            if(keysPressed['w']){
                this.body.y-=2
            }
            if(keysPressed['d']){
                this.body.x+=2
            }
            if(keysPressed['s']){
                this.body.y+=2
            }
            if(keysPressed['a']){
                this.body.x-=2
            }
        }
    }

    class Gun{
        constructor(owner){
          this.rate =250
          this.owner = owner
          this.bulletsize =2
          this.bulletspeed = 2
          this.range = 70
        }
        fire(tip){
        //   snowfreak+= .01
        if(this.owner.firing%this.rate == 0){
              this.owner.shots[ this.owner.shots.length] = new Circle(this.owner.gunspot.x,this.owner.gunspot.y, this.bulletsize, "white") // make the bullet
              this.owner.shots[this.owner.shots.length-1].health = this.range  //This controlls how far the bullet will go
              //trajectory calculation
              let s = Math.abs(this.owner.gunspot.x - tip.x)
              let b = Math.abs(this.owner.gunspot.y - tip.y)
              for (let k = 0; Math.sqrt(Math.abs(b*b)+Math.abs(s*s)) > this.bulletspeed; k++ ){   //sets speed to maximum from above
              b = b*.9999
              s = s*.9999
              }
              for (let k = 0;Math.sqrt(Math.abs(b*b)+Math.abs(s*s)) < this.bulletspeed; k++ ){ //sets speed to maximum from below
              b = b/.9999
              s = s/.9999
              }  
              //section to determine direction
              if(tip.x > this.owner.gunspot.x){
              this.owner.shots[ this.owner.shots.length-1].xmom = s
              }
              if(tip.x < this.owner.gunspot.x){
              this.owner.shots[ this.owner.shots.length-1].xmom = -s
              }
              if(tip.y< this.owner.gunspot.y){
                  this.owner.shots[ this.owner.shots.length-1].ymom = -b
              }
              if(tip.y> this.owner.gunspot.y){
                  this.owner.shots[ this.owner.shots.length-1].ymom = b
              }
            }
        }
    }

    class Crew{
        constructor(body){
            this.body = body
            this.health = 100
            this.maxhealth = 100
            this.statbox = new Rectangle(15, 0, 30, 70, "white")
            this.healthbar = new Rectangle(this.statbox.x+10, this.statbox.y+10, 10, 50)
            this.number = 0
        }
        draw(){

            // this.health-=.1

            this.healthbar = new Rectangle(this.statbox.x+10, this.statbox.y+10, 10, (50)*this.health/this.maxhealth, "green")
            this.healthbar2 = new Rectangle(this.statbox.x+10, this.statbox.y+10, 10, (50), "black")
            this.statbox.draw()
            this.healthbar2.draw()
            this.healthbar.draw()
            this.body.draw()



        tutorial_canvas_context.fillStyle = "white";
        tutorial_canvas_context.font = `${18}px Arial`;

        tutorial_canvas_context.fillText(`${this.number}`, this.statbox.x - 12, this.statbox.y+25);

        }
    }

    class EnemyShip{
        constructor(){
            this.body = new Rectangle(900, 300, 100, 100, "green")
            this.health = 100
            this.maxhealth = 100
            this.gun = new Gun(this)
            this.gun.damage = 5
            this.gunspot = new Circle(900,350, 1, "red")
            this.gunspotter = new Circle(351,350, 0, "transparent")
            this.shots = []
            this.gun.rate = 120
            this.statbox = new Rectangle(900,10,30, 270, "white")
            this.healthbar = new Rectangle(900, 20, 10, (50)*this.health/this.maxhealth, "green")
            this.shields = new Circle(950, 350, 75, "cyan")
            this.shieldcharge = 0
            this.shieldrate = 1
            this.firing = 1
        }
        draw(){
            
            this.shieldcharge+=this.shieldrate


            if(this.shieldcharge < 0){
                this.shieldcharge = 0
            }
            if(this.shieldcharge >= 200){
                this.shields.draw()
            }
            if(this.shieldcharge > 300){
                this.shieldcharge = 300
            }
            if(this.health <= 0){
                this.health = 0
            }
            this.statbox = new Rectangle(900,10,30, 270, "white")
            this.healthbar = new Rectangle(910, 20, 10, (250)*this.health/this.maxhealth, "green")
            this.healthbar2 = new Rectangle(910, 20, 10, (250), "black")

            this.firing++
            this.gunspotter = new Circle(351,350+((Math.random()-.5)*98), 0, "transparent")
            if(Math.random()<bottle.dodge){
                if(this.gunspotter.y<350){
                    this.gunspotter.y-=51
                }else{
                    this.gunspotter.y+=51
                }
            }

            this.gun.fire(this.gunspotter)
            // this.gunspot.draw()
            this.body.draw()
            this.gunspot.draw()

            for(let t = 0; t<this.shots.length; t++){
                this.shots[t].move()
                this.shots[t].draw()
            }
            for(let t = 0; t<this.shots.length; t++){
                if(this.shots[t].x < -100){
                    this.shots.splice(t,1)
                }
            }
            for(let t = 0; t<this.shots.length; t++){
                if(!bottle.helm.isPointInsideGuy(this.shots[t]) && !bottle.helmhall.isPointInsideGuy(this.shots[t])   && !bottle.doorcontrol.isPointInsideGuy(this.shots[t])   && !bottle.oxygenroom.isPointInsideGuy(this.shots[t])    && !bottle.weaponsbay.isPointInsideGuy(this.shots[t])   && !bottle.medbay.isPointInsideGuy(this.shots[t])   && !bottle.shieldroom.isPointInsideGuy(this.shots[t])    && !bottle.engineroom.isPointInsideGuy(this.shots[t])       && !bottle.mainhall.isPointInsideGuy(this.shots[t])  ){
                    
                }else{
                    if(bottle.shieldcharge < 200){
                        bottle.health -= this.gun.damage
                        bottle.shieldcharge = 0
                        for(let k = 0; k<bottle.crew.length; k++){
                            let line = new Line(bottle.crew[k].body.x, bottle.crew[k].body.y, this.shots[t].x, this.shots[t].y, "red", 1)
                            if(line.hypotenuse()<50){
                                bottle.crew[k].health -= (17-(line.hypotenuse()/3))
                            }
                        }
                    }else{
                        bottle.shieldcharge-=150
                    }
                    this.shots.splice(t,1)
                }
            }

            this.statbox.draw()
            this.healthbar2.draw()
            this.healthbar.draw()
        }
    }

    class Vessel{
        constructor(){
            this.shieldcharge = 801
            this.shieldchargerate = 1
            this.firingbar = new Rectangle(200, 505, 10, 0, "green")
            this.shieldbar = new Rectangle(200, 520, 10, 0, "cyan")
            this.autofire = 0
            this.firing = 1
            this.shots = []
            this.health = 100
            this.maxhealth = 100
            this.gun = new Gun(this)
            this.gun.damage = 5
            this.gun.bulletsize = 5
            this.selectedcrew = 0
            this.crew = []
            this.helm = new Rectangle(320,320, 60,30, "white")
            this.helmhall = new Rectangle(250,335, 30,100, "white")
            this.mainhall = new Rectangle(100,335, 30,160, "white")
            this.weaponsbay = new Rectangle(220,285, 60,40, "white")
            this.engineroom = new Rectangle(160,285, 60,40, "white")
            this.medbay = new Rectangle(100,285, 60,40, "white")
            this.shields = new Circle(220, 350, 140, "cyan")
            this.shields2 = new Circle(220, 350, 145, "cyan")
            this.shields3 = new Circle(220, 350, 150, "cyan")
            this.statbox = new Rectangle(100,10,30, 270, "white")
            this.healthbar = new Rectangle(100, 20, 10, (50)*this.health/this.maxhealth, "green")
            this.dodge = .05

            this.gunspot = new Circle(290,290, 1, "red")
            this.gunbar = new Rectangle(240, 285, 10, 50, "red")
            this.shieldbubble = new CircleX(240, 415, 8,"cyan")

            this.pluspartleftright = new Rectangle(117.5,300, 20, 5, "red")
            this.pluspartupdown = new Rectangle(109.5,307.5, 5, 20, "red")

            this.wheel = new CircleX(341, 350, 6, "gray")

            this.shieldroom = new Rectangle(220,355, 60,40, "white")
            this.doorcontrol = new Rectangle(160,355, 60,40, "white")
            this.oxygenroom = new Rectangle(100,355, 60,40, "white")
            this.rect = new Rectangle(100,285, 130, 250, "gray")

            for(let t = 0; t<4; t++){
                let crewman = new Crew(new Circle(this.helm.x+10, this.helm.y+15+(this.crew.length*7), 3, "black"))
                this.crew.push(crewman)
            }

            this.organizeCrew()
        }
        die(){
            this.shots = []
            this.doorcontrol.xmom = (Math.random()-.5)*3
            this.oxygenroom.xmom = (Math.random()-.5)*3
            this.shieldroom.xmom = (Math.random()-.5)*3
            this.engineroom.xmom = (Math.random()-.5)*3
            this.weaponsbay.xmom = (Math.random()-.5)*3
            this.medbay.xmom = (Math.random()-.5)*3
            this.helmhall.xmom = (Math.random()-.5)*3
            this.mainhall.xmom = (Math.random()-.5)*3
            this.helm.xmom = (Math.random()-.5)*3
            this.gunspot.xmom = (Math.random()-.5)*3
            this.doorcontrol.ymom = (Math.random()-.5)*3
            this.oxygenroom.ymom = (Math.random()-.5)*3
            this.shieldroom.ymom = (Math.random()-.5)*3
            this.engineroom.ymom = (Math.random()-.5)*3
            this.weaponsbay.ymom = (Math.random()-.5)*3
            this.medbay.ymom = (Math.random()-.5)*3
            this.helmhall.ymom = (Math.random()-.5)*3
            this.mainhall.ymom = (Math.random()-.5)*3
            this.helm.ymom = (Math.random()-.5)*3
            this.gunspot.ymom = (Math.random()-.5)*3

            
            this.doorcontrol.width -= .1*(Math.random())
            this.oxygenroom.width -= .1*(Math.random())
            this.shieldroom.width -= .1*(Math.random())
            this.engineroom.width -= .1*(Math.random())
            this.weaponsbay.width -= .1*(Math.random())
            this.medbay.width -= .1*(Math.random())
            this.helmhall.width -= .1*(Math.random())
            this.mainhall.width -= .1*(Math.random())
            this.helm.width -= .1*(Math.random())
            this.gunspot.width -= .1*(Math.random())
            
            this.doorcontrol.height -= .1*(Math.random())
            this.oxygenroom.height -= .1*(Math.random())
            this.shieldroom.height -= .1*(Math.random())
            this.engineroom.height -= .1*(Math.random())
            this.weaponsbay.height -= .1*(Math.random())
            this.medbay.height -= .1*(Math.random())
            this.helmhall.height -= .1*(Math.random())
            this.mainhall.height -= .1*(Math.random())
            this.helm.height -= .1*(Math.random())
            this.gunspot.height -= .1*(Math.random())

            this.crew = []



        }
        draw(){
            if(this.crew.length-1 < this.selectedcrew){
                this.selectedcrew = this.crew.length-1
            }

            if(this.crew.length > 9){
                this.crew.pop()
            }

            if(this.health <= 0){
                this.health = 0
            }
            this.healthbar = new Rectangle(110, 20, 10, (250)*this.health/this.maxhealth, "green")
            this.healthbar2 = new Rectangle(110, 20, 10, (250), "black")
            this.gunspotter = new Circle(351,350, 0, "transparent")

            for(let t = 0; t<this.crew.length; t++){
                if(this.crew[t].health <=0){
                    this.crew.splice(t,1)
                    this.organizeCrew()
                }
            }


            this.dodgecheck = 0
            for(let t = 0; t<this.crew.length; t++){
                if(this.weaponsbay.isPointInside(this.crew[t].body)){
                    this.firing +=1
                    this.gun.fire(boxer.gunspot)
                }
                if(this.helm.isPointInside(this.crew[t].body)){
                    this.dodgecheck++
                }
                if(this.medbay.isPointInside(this.crew[t].body)){
                    this.crew[t].health+=.2
                    if(this.crew[t].health > 100){
                        this.crew[t].health = 100
                    }
                }
                if(this.shieldroom.isPointInside(this.crew[t].body)){     
                    this.shieldcharge+=this.shieldchargerate
                    if(this.shieldcharge>= 801){
                        this.shieldcharge = 800
                    }
                 }
            }

            // if(this.dodgecheck > 0){
                this.dodge = this.dodgecheck *.1
            // }

            if(this.shieldcharge < 0){
                this.shieldcharge = 0
            }
            if(this.shieldcharge >= 200){
                this.shields.draw()
            }
            if(this.shieldcharge >= 450){
                this.shields2.draw()
            }
            if(this.shieldcharge >= 800){
                this.shields3.draw()
            }
            
            for(let t = 0; t<this.shots.length; t++){
                this.shots[t].move()
                this.shots[t].draw()
            }

            for(let t = 0; t<this.shots.length; t++){
                if(this.shots[t].x > tutorial_canvas.width){
                    this.shots.splice(t,1)
                }
            }

            for(let t = 0; t<this.shots.length; t++){
                if(boxer.body.isPointInside(this.shots[t])){
                    if(boxer.shieldcharge < 200){
                        boxer.health -= this.gun.damage
                        boxer.shieldcharge = 0
                    }else{
                        boxer.shieldcharge-=150
                    }
                    this.shots.splice(t,1)
                }
            }

            // this.rect.draw()

            this.firingbar.width = (this.firing%this.gun.rate)/2.5

            this.shieldbar = new Rectangle(200, 520, 10, 0, "cyan")
            this.shieldbar.width = (this.shieldcharge)/8

            if(this.shieldbar.width > 100){
                this.shieldbar.width = 100
            }

            this.firingbar.draw()
            this.shieldbar.draw()
            this.doorcontrol.draw()
            this.oxygenroom.draw()
            this.shieldroom.draw()
            this.engineroom.draw()
            this.weaponsbay.draw()
            this.medbay.draw()
            this.helmhall.draw()
            this.mainhall.draw()
            this.helm.draw()
            this.gunspot.draw()
            if(this.health <=0){
                this.die()
                this.doorcontrol.move()
                this.oxygenroom.move()
                this.shieldroom.move()
                this.engineroom.move()
                this.weaponsbay.move()
                this.medbay.move()
                this.helmhall.move()
                this.mainhall.move()
                this.helm.move()
                this.gunspot.move()
                this.gunspot.y = -10000
            }else{

                this.shieldbubble.draw()
                this.shieldroom.draw()
                this.gunbar.draw()
                this.weaponsbay.draw()
                this.pluspartleftright.draw()
                this.pluspartupdown.draw()
                this.wheel.draw()

            }

            if(this.crew.length >=1){
            if(this.crew.length > this.selectedcrew){
            this.crew[this.selectedcrew].body.radius = 4
            this.crew[this.selectedcrew].body.color = "red"
            this.crew[this.selectedcrew].statbox.color = "yellow"
            for(let t = 0; t<this.crew.length; t++){
                this.crew[t].draw()
                this.crew[t].body.radius = 3
                this.crew[t].number = t+1
                this.crew[t].statbox.color = "white"
                this.crew[t].body.color = "black"
            }
        }
    }
            this.statbox.draw()
            this.healthbar2.draw()
            this.healthbar.draw()
            if(this.crew.length >=1){
            this.control()
            }
        }
        organizeCrew(){
            for(let t = 0; t<this.crew.length; t++){
                this.crew[t].statbox.y = 10+t*40
            }
        }
        control(){

            if(keysPressed['1']){
                if(this.crew.length >= 1){
                this.selectedcrew = 0
                }
            }
            if(keysPressed['2']){
                if(this.crew.length >= 2){
                this.selectedcrew = 1
                }
            }
            if(keysPressed['3']){
                if(this.crew.length >= 3){
                this.selectedcrew = 2
                }
            }
            if(keysPressed['4']){
                if(this.crew.length >= 4){
                this.selectedcrew = 3
                }
            }
            if(keysPressed['5']){
                if(this.crew.length >= 5){
                this.selectedcrew = 4
                }
            }
            if(keysPressed['6']){
                if(this.crew.length >= 6){
                this.selectedcrew = 5
                }
            }
            if(keysPressed['7']){
                if(this.crew.length >= 7){
                    this.selectedcrew = 6
                }
            }
            if(keysPressed['8']){
                if(this.crew.length >= 8){
                    this.selectedcrew = 7
                }
            }
            if(keysPressed['9']){
                if(this.crew.length >= 9){
                    this.selectedcrew = 8
                }
            }

            if(keysPressed['w']){
                this.crew[this.selectedcrew].body.y-=.5
                if(!this.helm.isPointInsideGuy(this.crew[this.selectedcrew].body) && !this.helmhall.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.doorcontrol.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.oxygenroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.weaponsbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.medbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.shieldroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.engineroom.isPointInsideGuy(this.crew[this.selectedcrew].body)       && !this.mainhall.isPointInsideGuy(this.crew[this.selectedcrew].body)  ){
                    this.crew[this.selectedcrew].body.y+=.5
                }

            }
            if(keysPressed['d']){
                this.crew[this.selectedcrew].body.x+=.5
                if(!this.helm.isPointInsideGuy(this.crew[this.selectedcrew].body) && !this.helmhall.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.doorcontrol.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.oxygenroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.weaponsbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.medbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.shieldroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.engineroom.isPointInsideGuy(this.crew[this.selectedcrew].body)       && !this.mainhall.isPointInsideGuy(this.crew[this.selectedcrew].body)  ){
                    this.crew[this.selectedcrew].body.x-=.5
                }
            }
            if(keysPressed['s']){
                this.crew[this.selectedcrew].body.y+=.5
                if(!this.helm.isPointInsideGuy(this.crew[this.selectedcrew].body) && !this.helmhall.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.doorcontrol.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.oxygenroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.weaponsbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.medbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.shieldroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.engineroom.isPointInsideGuy(this.crew[this.selectedcrew].body)       && !this.mainhall.isPointInsideGuy(this.crew[this.selectedcrew].body)  ){
                    this.crew[this.selectedcrew].body.y-=.5
                }
            }
            if(keysPressed['a']){
                this.crew[this.selectedcrew].body.x-=.5
                if(!this.helm.isPointInsideGuy(this.crew[this.selectedcrew].body) && !this.helmhall.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.doorcontrol.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.oxygenroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.weaponsbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.medbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.shieldroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.engineroom.isPointInsideGuy(this.crew[this.selectedcrew].body)       && !this.mainhall.isPointInsideGuy(this.crew[this.selectedcrew].body)  ){
                    this.crew[this.selectedcrew].body.x+=.5
                }
            }

            if(keysPressed['ArrowUp']){
                this.crew[this.selectedcrew].body.y-=.5
                if(!this.helm.isPointInsideGuy(this.crew[this.selectedcrew].body) && !this.helmhall.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.doorcontrol.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.oxygenroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.weaponsbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.medbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.shieldroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.engineroom.isPointInsideGuy(this.crew[this.selectedcrew].body)       && !this.mainhall.isPointInsideGuy(this.crew[this.selectedcrew].body)  ){
                    this.crew[this.selectedcrew].body.y+=.5
                }

            }
            if(keysPressed['ArrowRight']){
                this.crew[this.selectedcrew].body.x+=.5
                if(!this.helm.isPointInsideGuy(this.crew[this.selectedcrew].body) && !this.helmhall.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.doorcontrol.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.oxygenroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.weaponsbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.medbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.shieldroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.engineroom.isPointInsideGuy(this.crew[this.selectedcrew].body)       && !this.mainhall.isPointInsideGuy(this.crew[this.selectedcrew].body)  ){
                    this.crew[this.selectedcrew].body.x-=.5
                }
            }
            if(keysPressed['ArrowDown']){
                this.crew[this.selectedcrew].body.y+=.5
                if(!this.helm.isPointInsideGuy(this.crew[this.selectedcrew].body) && !this.helmhall.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.doorcontrol.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.oxygenroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.weaponsbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.medbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.shieldroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.engineroom.isPointInsideGuy(this.crew[this.selectedcrew].body)       && !this.mainhall.isPointInsideGuy(this.crew[this.selectedcrew].body)  ){
                    this.crew[this.selectedcrew].body.y-=.5
                }
            }
            if(keysPressed['ArrowLeft']){
                this.crew[this.selectedcrew].body.x-=.5
                if(!this.helm.isPointInsideGuy(this.crew[this.selectedcrew].body) && !this.helmhall.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.doorcontrol.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.oxygenroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.weaponsbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.medbay.isPointInsideGuy(this.crew[this.selectedcrew].body)   && !this.shieldroom.isPointInsideGuy(this.crew[this.selectedcrew].body)    && !this.engineroom.isPointInsideGuy(this.crew[this.selectedcrew].body)       && !this.mainhall.isPointInsideGuy(this.crew[this.selectedcrew].body)  ){
                    this.crew[this.selectedcrew].body.x+=.5
                }
            }
        }
    }

    let bottle = new Vessel()

    let boxer = new EnemyShip()
    let continueButton = new Rectangle(900, 500, 50, 100, "red")
    
    let weaponUpgrade = 0
    let crewPlus = 0
    let hullUpgrade = 0
    let shieldUpgrade = 0


function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 10)+6];
    }
    return color;
  }

    let stars = []

    for(let h = 0; h < 800; h++){
     let a1 = new Rectangle((Math.random()*tutorial_canvas.width), Math.random()*tutorial_canvas.height, ((Math.random()*2)+.5),((Math.random()*2)+.5), getRandomLightColor())
  
     stars.push(a1)
     }
   
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width, tutorial_canvas.height)

    for (let n = 0; n < stars.length; n++){
        stars[n].draw(tutorial_canvas_context)
}

        bottle.draw()
     

        if(weaponUpgrade == 1 || crewPlus == 1 || hullUpgrade == 1 || shieldUpgrade == 1){
            boxer.body.y = -1000
            continueButton.draw()
            if(hullUpgrade ==1){
                tutorial_canvas_context.fillText("You got hull scraps!", 900, 200)
            }
            if(weaponUpgrade ==1){
                tutorial_canvas_context.fillText("You got weapon scraps!", 900, 200)
            }
            if(crewPlus ==1){
                tutorial_canvas_context.fillText("You rescued a prisoner!", 900, 200)
            }
            if(shieldUpgrade ==1){
                tutorial_canvas_context.fillText("You got shield tech!", 900, 200)
            }
        }else{
            if(boxer.health > 0){
                boxer.draw()
            }else{
                if(Math.random()<.66){
                    weaponUpgrade=1
                }else{
                    if(bottle.crew.length < 9){
                      crewPlus =1
                    }else{
                        weaponUpgrade=1
                    }
                }
                if(weaponUpgrade == 1){

                    if(Math.random()<.2){
                    hullUpgrade = 1
                    weaponUpgrade = 0
                    }else if(Math.random()<.4){
                        shieldUpgrade = 1
                        weaponUpgrade = 0
                    }
                }
            }
        }


    }, 7) 



        
})