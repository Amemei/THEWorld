
/*:
 * @plugindesc ぬぷ竜用管理プラグイン
 * @author ぬぷ竜
 *
 */
var setset;
(function() {
    var settexture = null;

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args)
        if (command === 'MNP') {
            var sum = 0;
            for (var i = 0; i < SceneManager._scene.children[0].children.length; i++) {
                if (SceneManager._scene.children[0].children[i].f_name == "NupuMov") {
                    SceneManager._scene.children[0].children[i]._texture.baseTexture.source.volume = 0;SceneManager._scene.children[0].removeChild(SceneManager._scene.children[0].children[i]);
                }
            }
            if (settexture == setstepup) {
                settexture = PIXI.VideoBaseTexture.VideoConvert(args[0]);
            } else {
                settexture.source.src = args[0];
                settexture.source.load();
                settexture.source.play();
            }
            var texture2 = new PIXI.Texture(settexture);
            texture = null;
            var bunny = new PIXI.Sprite(texture2);
            texture2 = cusestep;
            bunny.f_name = "NupuMov";
            bunny.position.x = 0;
            bunny.position.y = 0;
            bunny._texture.baseTexture.source.volume = AudioManager._bgmVolume / 100;
            if (args[1] == 1) {
                bunny._texture.baseTexture.source.loop = true;
            } else {
                bunny._texture.baseTexture.source.loop = false;
            }
            if (args[2] > 0) {
                bunny.position.y = args[2];
            } else {
                bunny.position.y = 0;
            }
            var setlenlen = SceneManager._scene.children[0].children.length;
            var slite = SceneManager._scene.children[0].children[setlenlen - 1];
            SceneManager._scene.children[0].addChild(bunny);
            bunny = null;
            PIXI.VideoBaseTexture.PullSetup(slite);
        }
        if (command === 'MNR') {
            for (var i = 0; i < SceneManager._scene.children[0].children.length; i++) {
                if (SceneManager._scene.children[0].children[i].f_name == "NupuMov") {
                    SceneManager._scene.children[0].children[i]._texture.baseTexture.source.volume = 0;
                    SceneManager._scene.children[0].removeChild(SceneManager._scene.children[0].children[i]);
                }
            }
        }
        if (command === 'MNPct') {
            var setlenlen = SceneManager._scene.children[0].children.length;
            var slite = SceneManager._scene.children[0].children[setlenlen - 1];
            for (var i = 2; i < SceneManager._scene.children[0].children.length; i++) {
                if (SceneManager._scene.children[0].children[i].f_name == "NupuMov") {
                } else {
                    SceneManager._scene.children[0].addChild(SceneManager._scene.children[0].children[i]);
                }
            }
            PIXI.VideoBaseTexture.PullSetup(slite);
        }
        if (command === 'MNPctOFF') {
            var setlenlen = SceneManager._scene.children[0].children.length;
            var slite = SceneManager._scene.children[0].children[setlenlen - 1];
            for (var i = 0; i < SceneManager._scene.children[0].children.length; i++) {
                if (SceneManager._scene.children[0].children[i].f_name == "NupuMov") {
                    SceneManager._scene.children[0].addChild(SceneManager._scene.children[0].children[i]);
                }
            }
            PIXI.VideoBaseTexture.PullSetup(slite);
        }
    };

})();