//***************************************************** 
//事前定義。経路図や点の名前を定義しておく
//以下のような経路で最短路を導く。nullは枝が繋がっていない。
const Omomi = [
    [0,1.23,1.33,3.8,null,null,null,null,null,null],
    [1.23,0,null,null,4.44,null,null,null,null,null],
    [1.33,null,0,null,null,0.68,null,null,null,null],
    [3.8,null,null,0,null,1.89,null,5.11,null,null],
    [null,4.44,null,null,0,null,null,2.91,null,5.27],
    [null,null,0.68,1.89,null,0,0.95,null,10.05,null],
    [null,null,null,null,null,0.95,0,3.75,null,null],
    [null,null,null,5.11,2.91,null,3.75,0,null,6.42],
    [null,null,null,null,null,10.05,null,null,0,8.00],
    [null,null,null,null,5.27,null,null,6.42,8.00,0]
];

//点の名前は数字番号としておく
const Name = ["1","2","3","4","5","6","7","8","9","10"];

//******************************************************** 
//ダイクストラ法
function Saitan(){
    let s = document.getElementById('Titen1');
    let S = s.value; //選ばれた始点の地点を取得
    let t = document.getElementById('Titen2');
    let T = t.value; //選ばれた終点の地点を取得
    let Keiro = []; //重み更新用
    let Kakutei = []; //経路確定用
    let SUM = []; //最短路長の計算用

    for(let i = 0; i < Name.length;i++){ //全地点の距離を未確定とする
        Keiro[i] = Number.MAX_VALUE; //javascriptで扱う事が出来る最大値（∞の代わり）
    }
    Keiro[S-1] = 0; //始点だけ0にする
    Kakutei.push(S); //始点が最短路に含まれるのは当たり前なので確定用配列に追加

    let loop = true;
    while(loop){ //変数loopが真の間、処理を繰り返す
        let MIN = Number.MAX_VALUE; //重みの最小値記憶用
        for(let i = S-1;i < Omomi.length;i++){ //高々Omomi.length(今回は10)回実行すれば十分であると判断した
            if((Omomi[S-1][i] !== 0)&&(Omomi[S-1][i] !== null)){ //もし始点行目で重みが0でない、かつnullでないとき
                if(Keiro[i] > Omomi[S-1][i]){ //そして重みの方が小さい時
                    Keiro[i] = Omomi[S-1][i]; //経路の重みを更新する
                    if((MIN > Omomi[S-1][i])&&(Omomi[S-1][T-1] == null)){ //各枝の重みの方が小さい、かつ操作点が終点に直接つながっていない時
                        MIN = Omomi[S-1][i]; //最小値を更新
                    }
                    else if(Omomi[S-1][T-1] !== null){ //終点に直接ノードがあれば
                        MIN = Omomi[S-1][T-1]; //最小値を終点への重みにする
                    }
                }
            }
        }
        let ind = Keiro.indexOf(MIN); //経路が最小となる点番号を取得
        Kakutei.push(Name[ind]); //経路を確定させる
        SUM.push(MIN); //経路の重みを加算していく
        S = ind + 1; //操作対象点を経路が繋がった先の点に更新
        if(S == T){ //SがTに達した時
            loop = false; //loopを偽にしてループを抜ける
        }
        //console.log(S); //確認用
    }
    let wa = 0; 
    for(let i = 0;i < SUM.length;i++){ //重みの和を求める
        wa = wa + SUM[i];
    }

    printMsg("最短経路は「" + Kakutei.join('-') + "」でその重みは" + wa + "です"); //配列要素の間にハイフンを入れるjoinメソッド
}

//**************************************************************************
//画面表示用
function printMsg(kekka){
    document.getElementById("kekka").innerHTML = kekka;
}