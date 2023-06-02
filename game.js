class Title extends Phaser.Scene{
    constructor(){
        super('title');
    }
    
    preload(){
        this.load.image("anim1", './titleassets/Animation1.png');
        //this.load.image("anim2", "./titleassets/Animation2.png");
        //this.load.image("anim3", "./titleassets/Animation3.png");
        this.load.image("title", './titleassets/title.png');
    }
    
    create(){
        let w = this.game.config.width;
        let h = this.game.config.height;
        let s = this.game.config.width * 0.01;

        let titleText = this.add.image(w*0.5, h*0.5, "title").setTintFill(0xa88932);

        let poly1 = this.add.image(w*0.5, h*0.5, "anim1");
        poly1.setInteractive();
        //let poly2 = this.add.image(w*0.5, h*0.5, "anim2");
        //let poly3 = this.add.image(w*0.5, h*0.5, "anim3");

        poly1.on('pointerdown', ()=>{
            this.scene.start('victory');
        })

        this.tweens.add({
            targets: poly1,
            scale: 1.1,
            angle: -2,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        

        let vt  = this.add.text(w*0.5, h*0.8, "Tap the poly to continue");
        vt.setScale(6);
        vt.setOrigin(0.5, 0.5);

        this.add.text(w-3*s, h-3*s, "📺")
            .setScale(2)
            .setOrigin(0.5, 0.5)
            .setStyle({ fontSize: `${2 * s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

    }

    update(){
        
    }

}


class Victory extends Phaser.Scene{
    constructor(){
        super('victory')
    }

    preload(){
        this.load.image("poly", './victoryassets/poly.png');
        this.load.image('badge', './victoryassets/badge.png');
    }

    create(){
        let w = this.game.config.width;
        let h = this.game.config.height;
        let s = this.game.config.width * 0.01;

        let poly = this.add.image(w*0.5, h*0.5, "poly");
        let badge = this.add.image(w*0.5, h*0.5, "badge");

        badge.alpha = 0;
        badge.setScale(3);

        this.tweens.add({
            targets:badge,
            y: {from: h*0.2, to: h*0.5},
            alpha: 1,
            scale: 1,
            duration: 2000,
            onComplete: () =>{
                this.tweens.add({
                    targets: [badge,poly],
                    y: '-=' + 50,
                    duration: 200,
                    yoyo: true,
                    repeat: 2
                });
            }
        });
        
        this.input.on('pointerdown', () => this.scene.start('title'));
        let vt  = this.add.text(w*0.5, h*0.8, "Roly Poly gets a badge!");
        vt.setScale(6);
        vt.setOrigin(0.5, 0.5);

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
        
        this.add.text(w-3*s, h-3*s, "📺")
            .setScale(2)
            .setOrigin(0.5, 0.5)
            .setStyle({ fontSize: `${2 * s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
        
    }
    
    update(){
        
    }
}

let config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1200,
    },
    backgroundColor: 0x214026,
    scene: [Title, Victory],
}

let game = new Phaser.Game(config);