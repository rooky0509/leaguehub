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

function set(itemIndex){
  item = items[itemIndex];
  console.log(itemIndex);
  document.getElementById("item").src = "http://ddragon.leagueoflegends.com/cdn/"+version+"/img/item/"+item["id"]+".png"
  document.getElementsByTagName("name")[0].innerHTML = item["data"]["name"];
  document.getElementsByTagName("gold")[0].innerHTML = item["data"]["gold"]["total"];
  document.getElementsByTagName("html")[0].style.backgroundImage = "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg')";
}

function search(input){  
  if(input.length >= 1){
    console.log(input);
    findItem = items.filter(a => a["name"].indexOf(input) != -1);
    console.log(findItem);
    if(findItem[0] != undefined) set(findItem[0]["index"]);
    // && document.getElementsByTagName("name")[0].innerHTML != find
  }
} 

/*

1. git remote add <name> <url>                [ remote 추가 ]
  > error: remote <name> already exists.        ㄴ[ 이미 존재한다면 ]
    1. git remote set-url --add <name> <url>        ㄴ[ url추가 ]
    2. git remote get-url --all <name>              ㄴ[ 저장된 모든 url조회 ]
    3. git remote set-url --delete <name> <url>     ㄴ[ url삭제 ]

2. " + " 클릭            [ Changes -> Staged Changes ]
3. " ✓ " 클릭             [ Staged Changes => commit ]
4. git push -u origin main     [ commit => push => github ]

*/