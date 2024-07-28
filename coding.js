const Base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromcur=document.querySelector(".from select");
const tocur=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(curcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=curcode;
        newOption.value=curcode;
        if(select.name==="from" & curcode==="USD")
            {
                newOption.selected="selected";
            }
            if(select.name==="to" & curcode==="INR")
                {
                    newOption.selected="selected";
                }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}

const updateflag=(element)=>{
   let curcode=element.value;
   let countrycode=countryList[curcode];
   let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");          //copied
   img.src=newsrc;
};
btn.addEventListener(("click"), async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".Amount input");
    let amtval=amount.value;
    const URL=`${Base_URL}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`;
    console.log(URL);
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[tocur.value.toLowerCase()]; //copied
    let finalamt=amtval*rate;
    console.log(finalamt);
    msg.innerText=`${amtval} ${fromcur.value} = ${finalamt} ${tocur.value}`;
});