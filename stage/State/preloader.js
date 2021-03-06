import config from '../GameConfiger/config';
const Phaser = window.Phaser;
import {getDogsInfo} from '../../view/mock/getMocks';
import {prostatus} from '../../view/utils/env';
class preloader extends Phaser.State {
    constructor () {
        super();
    }

    init () {
       this.addBackground();
       this.addPreloadBar();
       this.addLoadingInfo();
       this.addCompanyInfo();
       this.path = prostatus === 'development' ? '' : '/MemberCenter';
       this.resize();
       window.vcom.watchVis = !1;
       document.querySelector('#manor').style.display = 'block';
    }

    preload () {
        this.loadFontAssets();
        this.loadImages();
        this.loadJsonConfig();
        this.loadGraphics();
        this.load.setPreloadSprite(this.innerPreloaderSprite, 1);
    }

    create () {
        this.getDogsInfo();
    }

    async getDogsInfo () {
      try {
        let dogsResp = await getDogsInfo();
        if (dogsResp.data.code === 'success') {
          this.dogsResp = dogsResp.data.data;
          // mainMenu
          this.game.changeState('mainMenu', {resp: this.dogsResp, frompreloader: !0});
        } else {
          alert('获取信息失败！');
        }
      }
      catch (e) {
        alert('请求用户信息失败，刷新重试');
      }
    }

    loadFontAssets () {
        this.load.bitmapFont('digits', this.path + '/static/assets/fonts/font.png', this.path + '/static/assets/fonts/font.fnt', null);
    }

    loadImages () {
      this.load.image('avator', prostatus === 'development' ? '/static/assets/img/avator.jpg' : window.psObj.headimgurl);
      this.load.image('touchTex', this.path + '/static/assets/touch_show/touch_tex.png');
      this.load.image('drinkingTex', this.path + '/static/assets/drinking_show/drinking_tex.png');
      this.load.image('eatingTex', this.path + '/static/assets/eating_show/eating_tex.png');
      this.load.image('enoughTex', this.path + '/static/assets/enough_show/enough_tex.png');
      this.load.image('restart', this.path + '/static/assets/img/reborn.png');
      this.load.image('newDog', this.path + '/static/assets/img/rebornDog.png');
      this.load.image('gameBg', this.path +'/static/assets/graphics/gameBg.png');
      this.load.spritesheet('res1', this.path + '/static/assets/graphics/game_res1.jpg', 190, 190);
      this.load.spritesheet('res2', this.path + '/static/assets/graphics/game_res2.jpg', 190, 190);
      this.load.spritesheet('res3', this.path + '/static/assets/graphics/game_res3.jpg', 190, 190);
      this.load.spritesheet('res4', this.path + '/static/assets/graphics/game_res4.jpg', 190, 190);
      this.load.spritesheet('res5', this.path + '/static/assets/graphics/game_res5.jpg', 190, 190);
      this.load.spritesheet('res6', this.path + '/static/assets/graphics/game_res6.jpg', 190, 190);
    }

    loadJsonConfig () {
      this.load.json('touch', this.path + '/static/assets/touch_show/touch_tex.json');
      this.load.json('touchSke', this.path + '/static/assets/touch_show/touch_ske.json');
      this.load.json('drinking', this.path + '/static/assets/drinking_show/drinking_tex.json');
      this.load.json('drinkingSke', this.path + '/static/assets/drinking_show/drinking_ske.json');
      this.load.json('eating', this.path + '/static/assets/eating_show/eating_tex.json');
      this.load.json('eatingSke', this.path + '/static/assets/eating_show/eating_ske.json');
      this.load.json('enough', this.path + '/static/assets/enough_show/enough_tex.json');
      this.load.json('enoughSke', this.path + '/static/assets/enough_show/enough_ske.json');
    }

    loadGraphics () {
        this.load.atlasJSONHash('distant', this.path + '/static/assets/graphics/distant.png', this.path + '/static/assets/jsonHash/distant.json');
        this.load.atlasJSONHash('manorUi', this.path + '/static/assets/graphics/manorUi.png', this.path + '/static/assets/jsonHash/manorUi.json');
        this.load.atlasJSONHash('manorIcon', this.path + '/static/assets/graphics/manorIcon.png', this.path + '/static/assets/jsonHash/manorIcon.json');
        this.load.atlasJSONHash('gameUi', this.path + '/static/assets/graphics/gameUi.png', this.path + '/static/assets/jsonHash/gameUi.json');
    }

    addBackground () {
       this.bg = this.game.add.image(0, 0, 'preloader', 'BG0000.png');
    }

    addPreloadBar () {
        this.outerPreloaderSprite = this.game.add.image(0, 0, 'preloader', 'Preloader_Back0000.png');
        this.outerPreloaderSprite.position.set(config.HALF_GAME_WIDTH, config.HALF_GAME_HEIGHT);
        this.outerPreloaderSprite.anchor.set(.5);
        this.innerPreloaderSprite = this.game.add.image(0, 0, 'preloader', 'Preloader_Front0000.png');
        this.innerPreloaderSprite.position.set(config.HALF_GAME_WIDTH - this.innerPreloaderSprite.width * .5 + 2,
            config.HALF_GAME_HEIGHT - this.innerPreloaderSprite.height * .5);
    }

    addLoadingInfo () {
        let loadingStyle = {
            font: '40px GrilledCheeseBTNToasted',
            fill: '#FFFFFF',
            align: 'center'
        };
        this.loadingText = this.game.add.text(0, 0, '', loadingStyle);
        this.loadingText.anchor.set(.5);
        this.loadingText.setShadow(4, 4, '#999');
        this.loadingText.position.set(config.HALF_GAME_WIDTH, config.HALF_GAME_HEIGHT + this.outerPreloaderSprite.height + 10);
        this.game.time.events.add(100, () => {
           this.loadingText.setText('loading...');
        });
    }

  loadUpdate () {
        this.loadingText.setText(this.load.progress + '%');
    }

    addCompanyInfo () {
        let info = '一站地网络科技\nwww.ezhandi.com , 2018';
        let style = {
          font: '26px Verdana',
          fill: '#FFFFFF',
          align: 'center'
        };
        this.copyright = this.game.add.text(0, 0, info, style);
        this.copyright.lineSpacing = 10;
        this.copyright.anchor.set(.5);
        this.copyright.position.set(config.HALF_GAME_WIDTH, config.GAME_HEIGHT - this.copyright.height);
        this.copyright.setShadow(2, 2, '#333');
    }

    resizeBackground () {
        this.bg.width = config.GAME_WIDTH + 1;
        this.bg.height = config.GAME_HEIGHT + 1;
    }

    resize () {
        this.resizeBackground();
    }

    shutdown () {
        this.cache.removeImage('preloader', !0);
    }
}

export default preloader;
