
// --------------------------------------------------------------------------
// 
// MapNameinSaveData.js
//
// Copyright (c) kotonoha* ※ぬぷ竜が少し改造
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2016/06/13 ver1.0 プラグイン公開
// 2017/01/31 ver1.N ぬぷ竜がちょっと改造したよ
// 
// --------------------------------------------------------------------------
/*:
 * @plugindesc セーブデータ上に現在マップ名を載せるプラグイン
 * @author kotonoha* 改造：nupuryu
 * 
 * @param Save No
 * @desc セーブデータ名保存用ゲーム変数を指定する。
 * @default 1
 * 
 * @help セーブデータ上に指定の名称を記述するスクリプト
 * プラグインコマンドで以下を打ち込むことで使用可能。
 * 
 * セーブ名の指定
 * SAVENAME セーブ名
 * 
 * セーブ名をマップの名前にする。
 * SAVENAME MAP
 */

(function() {
    //指定パラメータの取得
    var parameters = PluginManager.parameters('MapNameinSaveData');
    var saveno = parseInt(parameters['Save No'] || '1');
    //プラグインコマンドの設定
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if ((command || '').toUpperCase() === 'SAVENAME') {
            switch(args[0]){
                case 'MAP':
                $gameVariables.setValue(saveno, 0)
                    break;
                default:
                $gameVariables.setValue(saveno, args[0])
                    break;

            }
        }
    }

    DataManager.makeSavefileInfo = function() {
        var info = {};
        info.globalId = this._globalId;
        info.title = $dataSystem.gameTitle;
        console.log($gameVariables.value(saveno));
        if($gameVariables.value(saveno) == 0){
            info.mapname = $gameMap.displayName();
        }else{
            info.mapname = $gameVariables.value(saveno);
        }

        info.characters = $gameParty.charactersForSavefile();
        info.faces = $gameParty.facesForSavefile();
        info.playtime = $gameSystem.playtimeText();
        info.timestamp = Date.now();
        return info;
    };

    Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
        var bottom = rect.y + rect.height;
        if (rect.width >= 420) {
            this.drawGameMapName(info, rect.x + 192, rect.y, rect.width - 192);
            if (valid) {
                this.drawPartyCharacters(info, rect.x + 220, bottom - 4);
            }
        }
        var lineHeight = this.lineHeight();
        var y2 = bottom - lineHeight;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x + 190, rect.y, rect.width - 192);
        }
    };

    Window_SavefileList.prototype.drawGameMapName = function(info, x, y, width) {
        if (info.mapname) {
            this.drawText(info.mapname, x, y, width);
        }
    };

})(); 