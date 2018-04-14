var me=true;
var chesssave=[];
var gameover=false;
var mywin=[] //值为5时代表我赢了
var aiwin=[]//值为5时代表AI赢了
var count=0;

for(var i=0;i<15;i++)  //进行初始化
{
    chesssave[i]=[];
    for(var j=0;j<15;j++)
    {
        chesssave[i][j]=0;
    }

}

var wins=[];    //定义三维赢法数组wins[15][15][]
for(var i=0;i<15;i++)
{
    wins[i]=[];
    for(var j=0;j<15;j++)
    {
        wins[i][j]=[];

    }

}
//wins[0][0][0]=true;
//wins[0][1][0]=true;
//wins[0][2][0]=true;
//wins[0][3][0]=true;
//wins[0][4][0]=true;


//wins[0][1][1]=true;
//wins[0][2][1]=true;
//wins[0][3][1]=true;
//wins[0][4][1]=true;
//wins[0][5][1]=true;


for (var i = 0; i < 15; i++) {
   // wins[i]=[];
    for(var j=0; j<11; j++){

        for(var k=0; k<5; k++){
          // wins[i][j+k]=[];
            wins[i][j+k][count] = true;

        }

        count ++;

    }

}


for(var i=0;i<15;i++) //横线上赢法的赋值 (15x15)
{
    for(var j=0;j<11;j++)
    {
        for(var k=0;k<5;k++)
        {
            wins[j+k][i][count]=true;
        }
        count++;
    }


}


for(var i=0;i<11;i++) //正斜线上赢法的赋值  (15x15)
{
    for(var j=0;j<11;j++)
    {
        for(var k=0;k<5;k++)
        {
            wins[i+k][j+k][count]=true;
        }
        count++;
    }


}

for(var i=0;i<11;i++) //反斜线上赢法的赋值  (15x15)
{
    for(var j=14;j>3;j--)
    {
        for(var k=0;k<5;k++)
        {
            wins[i+k][j-k][count]=true;
        }
        count++;
    }


}
//对mywin[]和aiwin[]进行初始化
for(var i=0;i<count;i++)
{
    mywin[i]=0;
    aiwin[i]=0;

}




console.log(count);



var chess=document.getElementById('chess');
var context=chess.getContext('2d');

var logo=new Image();
logo.src="image/logo.png";
logo.onload=function () {
    context.drawImage(logo,0,0,450,450);
    draw();
   // onestep(0,0,true);
 //   onestep(5,5,false);


}

function draw() {
    context.strokeStyle = "#BFBFBF";
    for (var i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();

    }
}
function onestep(i,j,me) {

    context.beginPath();
    context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
  if(me) {
      gradient.addColorStop(0, "#0A0A0A");
      gradient.addColorStop(1, "#636766");
  }else
  {
      gradient.addColorStop(0, "#D1D1D1");
      gradient.addColorStop(1, "#F9F9F9");

  }
    context.fillStyle=gradient;
    context.fill();
    //context.stroke();
}
//点击触发函数
chess.onclick=function (e) {
    if(gameover)
    {
        return; //不执行下面的语句
    }
    if(!me)
    {
        return;//不是我方下棋则不执行
    }
   //alert("a");
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chesssave[i][j]==0) {
        onestep(i, j, me);
            chesssave[i][j]=1;
        for(var k=0;k<count;k++)  //人赢法统计
        {
            if(wins[i][j][k])
            {
                mywin[k]++;
                aiwin[k]=6; //异常处理
                if(mywin[k]==5)
                {
                    // alert("win");
                    window.alert("你赢了");  //man是黑色旗子
                    gameover=true;
                }
            }
        }
        if(!gameover)
        {
            me=!me;
            Aichess();//调用计算机下棋的函数
        }

    }

}
var Aichess =function()
{
   // alert("b");
    var max=0;//定义最大分数
    var u=0;
    var v=0;//定义两个坐标
    var myscore=[];//用来存放人的分数
    var Aiscore=[];//用来存放计算机的分数

    //接下来初始化二维数组,值都为0
    for(var i=0;i<15;i++)
    {
        Aiscore[i]=[];
        myscore[i]=[];
        for(var j=0;j<15;j++)
        {

            myscore[i][j]=0;
            Aiscore[i][j]=0;
        }
    }

    for(var i=0;i<15;i++) //遍历棋盘
    {
        for(var j=0;j<15;j++)
        {
            if(chesssave[i][j]==0)//该地方还未落子
            {
                for (var k = 0; k < count; k++) //遍历所有赢法
                {
                    if(wins[i][j][k])//下的地方符合赢法数组的某个内容
                    {
                        //下面赋值分数
                        if(mywin[k]==1)  //符合赢法的第一步了
                        {
                            myscore[i][j]+=200;

                        }else if(mywin[k]==2)
                        {
                            myscore[i][j]+=400;

                        }else if(mywin[k]==3)
                        {
                            myscore[i][j]+=2000;

                        }else if(mywin[k]==4)
                        {
                            myscore[i][j]+=10000;
                        }

                        if(aiwin[k]==1)  //符合赢法的第一步了
                        {
                            Aiscore[i][j]+=220;

                        }else if(aiwin[k]==2)
                        {
                            Aiscore[i][j]+=420;

                        }else if(aiwin[k]==3)
                        {
                            Aiscore[i][j]+=2100;

                        }else if(aiwin[k]==4)
                        {
                            Aiscore[i][j]+=20000;
                        }

                    }
                }

                if(myscore[i][j]>max)
                {
                    max=myscore[i][j];
                    u = i;
                    v = j;
                }else if(myscore[i][j]==max)
                {
                    if(Aiscore[i][j]>Aiscore[u][v])
                    {
                        u = i;
                        v = j;
                    }

                }
                if(Aiscore[i][j]>max)
                {
                    max=Aiscore[i][j];
                    u = i;
                    v = j;
                }else if(Aiscore[i][j]==max)
                {
                    if(myscore[i][j]>myscore[u][v])
                    {
                        u = i;
                        v = j;
                    }

                }

            }

        }

    }
    console.log(u);
    console.log(v);
    onestep(u,v,false);
    chesssave[u][v]=2;
    for(var k=0;k<count;k++)
    {
        if(wins[u][v][k])
        {
            aiwin[k]++;
            mywin[k]=6; //异常处理
            if(aiwin[k]==5)
            {
                // alert("win");
                window.alert("计算机赢了");  //man是黑色旗子
                gameover=true;
            }
        }

    }
    if(!gameover)
    {
        me=!me;
    }

}