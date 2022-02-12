//=============================================================================
// TatieScript.js
//=============================================================================

/*:
 * @plugindesc Alternative menu screen layout.
 * @author Nupuryu
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc 簡易的に立ち絵を表示させます。
 * @author Nupuryu
 * 
 * @param Left Pict
 * @desc 左側立ち絵を表示するピクチャ番号。
 * @default 1
 *
 * @param Right Pict
 * @desc 右側立ち絵を表示するピクチャ番号。
 * @default 2
 * 
 * @param Left Rev
 * @desc 左側を反転させる場合は-1を入力する。
 * @default 1
 * 
 * @param Hantoumei
 * @desc 喋っていないキャラを半透明にする 1で対応、それ以外は無効
 * @default 1
 * 
 *
 * @help Nupu式 立ち絵表示スクリプト
 * プラグインコマンドで以下の入力をする事で立ち絵を実装することができます。
 * 
 * 右側に立ち絵を表示する。　TATIE rset 立ち絵画像名 ズレピクセル
 * 右側に立ち絵をタイムロスナシで表示(表情差分など)　TATIE rface 立ち絵画像名
 * 右側に立ち絵を消す　 TATIE rc
 * ※左側に立ち絵を出す場合は "r"を"l"にする
 * ※中心に立ち絵を出す場合は "r"を"c"にすると動きます ※中心配置の場合は他配置機能は使えません。
 *
 * TATIE pload 画像　にて、あらかじめ画像をロードしておくことができる。)20枚まで
 * ピクチャ番号70～90はロード機能を使う場合は埋まるので注意
 * *Hシーン：
 * 
 * 立ち絵に動作をつける。　TATIE move r 動作コード
 */

//name space

(function () {
    //指定パラメータの取得
    var parameters = PluginManager.parameters('TatieScript');
    var rpctNo = parseInt(parameters['Right Pict'] || '1');
    var lpctNo = parseInt(parameters['Left Pict'] || '2');
    var leftrev = parseInt(parameters['Left Rev']) || '1';
    var toumei = parseInt(parameters['Hantoumei']) || '1';

    var rpicton = false; //右ピクチャが表示されている時true
    var lpicton = false; //左ピクチャがryaku

    var loadcount = 20;
    var picloadc = 0; //左ピクチャがryaku

    //プラグインコマンドの設定
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if ((command || '').toUpperCase() === 'TATIE') {

            var rsetpos = Graphics.width /2 + Graphics.width /4;
            var lsetpos = Graphics.width /4
            var csetpos = Graphics.width /2

            switch(args[0]){
                //右側に立ち絵を表示する。
                case 'rset':
                    console.log("tatie" + args[0] + " " + args[1]);
                    $gameScreen.showPicture(rpctNo,args[1],1,
                    rsetpos +20 , Graphics.height /2,100,100,0,0)
                    $gameScreen.movePicture(rpctNo,1,
                    rsetpos , Graphics.height /2,100,100,255,0,10)
                    rpicton = true;
                    if(lpicton == true){
                    console.log("lpicton");
                        $gameScreen.movePicture(lpctNo,1,
                        Graphics.width /4 , Graphics.height /2,100*leftrev,100,150,0,5);
                    }
                    break;
                //右側に立ち絵をタイムロスナシで表示
                case 'rface':
                    console.log("tatie" + args[0] + " " + args[1]);
                    $gameScreen.showPicture(rpctNo,args[1],1,
                    rsetpos , Graphics.height /2,100,100,255,0)
                    if(lpicton == true){
                    console.log("lpicton");
                        $gameScreen.movePicture(lpctNo,1,
                        lsetpos , Graphics.height /2,100*leftrev,100,150,0,5);
                    }
                    break;
                //右側立ち絵を消す。
                case 'rc':
                    console.log("tatie" + args[0] + " " + args[1]);
                    $gameScreen.movePicture(rpctNo,1,
                    rsetpos +20 , Graphics.height /2,100,100,0,0,10);
                    this.wait(10);
                    rpicton = false;
                    break;
                //左側に立ち絵を表示する。
                case 'lset':
                    console.log(leftrev);
                    $gameScreen.showPicture(lpctNo,args[1],1,
                    lsetpos - 20 , Graphics.height /2,100*leftrev,100,0,0);
                    $gameScreen.movePicture(lpctNo,1,
                    lsetpos , Graphics.height /2,100*leftrev,100,255,0,10);
                    lpicton = true;
                    if(rpicton == true){
                    $gameScreen.movePicture(rpctNo,1,
                    rsetpos , Graphics.height /2,100,100,150,0,5)
                    }
                    break;
                //左側に立ち絵をタイムロスナシで表示
                case 'lface':
                    console.log("tatie" + args[0] + " " + args[1]);
                    $gameScreen.showPicture(lpctNo,args[1],1,
                    lsetpos, Graphics.height /2,100*leftrev,100,255,0)
                    if(rpicton == true){
                        $gameScreen.movePicture(rpctNo,1,
                        rsetpos  , Graphics.height /2,100,100,150,0,5);
                    }
                    break;
                //左側立ち絵を消す。
                case 'lc':
                    $gameScreen.movePicture(lpctNo,1,
                    lsetpos - 20 , Graphics.height /2,100*leftrev,100,0,0,10);
                    this.wait(10);
                    lpicton = false;
                    break;
                //両方の立ち絵を消す。
                case 'allc':
                    $gameScreen.movePicture(lpctNo,1,
                    lsetpos - 20 , Graphics.height /2,100*leftrev,100,0,0,10);
                    $gameScreen.movePicture(rpctNo,1,
                    rsetpos +20 , Graphics.height /2,100,100,0,0,10);
                    this.wait(10);
                    lpicton = false;
                    rpicton = false;
                    break;

                //中心に立ち絵を表示する。
                case 'cset':
                    $gameScreen.showPicture(rpctNo,args[1],1,
                    csetpos, Graphics.height /2 +20,100,100,0,0);
                    $gameScreen.movePicture(rpctNo,1,
                    csetpos , Graphics.height /2,100,100,255,0,20);
                    rpicton = true;
                    break;
                //中心に立ち絵をタイムロスナシで表示
                case 'cface':
                    console.log("☆2");
                    $gameScreen.showPicture(rpctNo,args[1],1,
                    csetpos , Graphics.height /2,100,100,255,0)
                    break;
                //中心立ち絵を消す。
                case 'cc':
                    console.log("tatie" + args[0] + " " + args[1]);
                    $gameScreen.movePicture(rpctNo,1,
                    csetpos , Graphics.height /2  +20,100,100,0,0,10);
                    this.wait(10);
                    rpicton = false;
                    break;

                 //ファイルロード(10枚まで)   
                case 'pload':
                    console.log("tatie" + args[0] + " " + args[1]);
                    $gameScreen.showPicture(99-loadcount+picloadc,args[1],1,
                    csetpos, Graphics.height /2 +20,100,100,0,0)
                    rpicton = true;
                    if(picloadc != loadcount){
                        picloadc ++;
                    }else{
                        picloadc = 0;
                    }
                    break;


                default:
                    break;
            }
        }
    };
})();