function GET(url,code){
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  console.log(url);
  request.onload = function (){
    code(request.response);
  }
}

var version = "";
var items = [];
var champs = [];
// md : https://github.com/communitydragon/docs/blob/master/assets.md
// position : https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/
// player icon : https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/
// stats : https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/
// rune : https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/
// d : https://raw.communitydragon.org/latest/game/ux/fonts.bin.json

GET("https://ddragon.leagueoflegends.com/api/versions.json",(versions_data) =>{
  version = versions_data[0];
  console.log(version);
  GET("https://ddragon.leagueoflegends.com/cdn/"+version+"/data/ko_KR/item.json",(items_json) =>{

    item_data = items_json["data"]
    items = []
    i = 0;
    for (x in item_data){
      items.push({"name":item_data[x]["name"],"id":x,"data":item_data[x],"index":i++});
    }
    console.log(items);

    GET("https://raw.communitydragon.org/latest/game/ux/fonts.bin.json",(css_colors_json) =>{
      css_colors_data = css_colors_json["{9c87124a}"]["styles"]
      css_colors = {};
      for (x in css_colors_data){
        css_color = css_colors_data[x]["color"]; // 0 1 2 3
        if (css_color!=undefined){
          css_colors[x.toLowerCase()] = "rgba("+[css_color[2],css_color[1],css_color[0],css_color[3]].join(',')+")";
        }
      }


      GET("https://ddragon.leagueoflegends.com/cdn/"+version+"/data/ko_KR/champion.json",(champs_json) =>{
        champ_data = champs_json["data"]
        champs = []
        i = 0;
        for (x in champ_data){
          champs.push({"name":champ_data[x]["name"],"id":x,"data":champ_data[x],"index":i++});
        }
      });


    });
  });
});

function set(Index,type){
  console.log(Index);
  console.log(type);
  switch (type){
    case "item":
      item = items[Index];

      table = document.getElementById("item_table");
      
      table.getElementsByTagName("img")[0].src = "http://ddragon.leagueoflegends.com/cdn/"+version+"/img/item/"+item["id"]+".png";
      table.getElementsByTagName("img")[0].alt = item["name"]+".png"
      table.getElementsByTagName("img")[0].title = item["name"]+"\n\n"+item["data"]["plaintext"];

      table.getElementsByTagName("name")[0].innerHTML = item["name"];
      table.getElementsByTagName("gold")[0].innerHTML = item["data"]["gold"]["total"];

      table.getElementsByTagName("description")[0].innerHTML = item["data"]["description"];
      Array.from( table.getElementsByTagName("maintext")[0].children ).forEach(child_P => Array.from( child_P.children ).forEach(child => {
        child.style.color = css_colors[child.nodeName.toLowerCase()]
      }))

      break;
    case "champ":
      champ = champs[Index];

      table = document.getElementById("champ_table");
      
      table.getElementsByTagName("img")[0].src = "http://ddragon.leagueoflegends.com/cdn/"+version+"/img/champion/"+champ["id"]+".png";
      table.getElementsByTagName("img")[0].alt = champ["name"]+".png"
      table.getElementsByTagName("img")[0].title = champ["name"]+"\n\n"+champ["data"]["plaintext"];

      table.getElementsByTagName("name")[0].innerHTML = champ["name"];
      /*
      table.getElementsByTagName("gold").innerHTML = champ["data"]["gold"]["total"];

      table.getElementsByTagName("description").innerHTML = champ["data"]["description"];
      Array.from( table.getElementsByTagName("maintext").children ).forEach(child_P => Array.from( child_P.children ).forEach(child => {
        child.style.color = css_colors[child.nodeName.toLowerCase()]
      }))
      */
      break;
    default:
      console.log("set function tpye Error");
  }
  
  
  document.getElementsByTagName("html")[0].style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg')";
}

function search(input,type){  
  console.log(input);
  console.log(type);
  if(input.length >= 1){
    console.log(input);
    switch (type){
      case "item":
        findItem = items.filter(a => a["name"].indexOf(input) != -1);
        console.log(findItem);
        if(findItem[0] != undefined) set(findItem[0]["index"],type);
        // && document.getElementsByTagName("name")[0].innerHTML != find
        break;
      case "champ":
        findChamp = champs.filter(a => a["name"].indexOf(input) != -1);
        console.log(findChamp);
        if(findChamp[0] != undefined) set(findChamp[0]["index"],type);
        // && document.getElementsByTagName("name")[0].innerHTML != find
        break;
      default:
        console.log("search function tpye Error");
    }
  }
  

} 

/*
-----------------------------------------------------------------------------------------
[ 
  <name> : origin 
  <url> : https://github.com/rooky0509/leaguehub.git
  Present_branch : main
]

-----------------------------------------------------------------------------------------

1. git remote add <name> <url>                [ remote 추가 ]
  > error: remote <name> already exists.        ㄴ[ 이미 존재한다면 ]
    1. git remote set-url --add <name> <url>        ㄴ[ url추가 ]
    2. git remote get-url --all <name>              ㄴ[ 저장된 모든 url조회 ]
    3. git remote set-url --delete <name> <url>     ㄴ[ url삭제 ]

2. " + " 클릭                                       [ Changes -> Staged Changes ]

3. " ✓ " 클릭                                       [ Staged Changes => commit ]

4. git push -u <name> main                            [ commit => push => github ]
  > git pull origin main --allow-unrelated-histories    ㄴ[Github => Local]


-----------------------------------------------------------------------------------------
  git branch                 [현재 브런치 확인]
  git branch -m master main    ㄴ[master -> main]
*/

