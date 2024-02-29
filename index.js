const loadPhone = async(searchText) =>{
    const res = await fetch(`
    https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phone = data.data;
     console.log(phone);
     displayPhone(phone)
}


const displayPhone = phone =>{
    // console.log(phone);

    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent ='';
const showAll = document.getElementById('show-all');
    if(phone.length > 12){
      showAll.classList.remove('hidden')
    }else
  {
    showAll.classList.add('hidden')
  }

// display only 10 phones shows
    phone = phone.slice(0,20);
     
   

phone.forEach(phone => {
    // console.log(phone)

    // create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-64 h-[430px] bg-gray-200 shadow-xl`
    phoneCard.innerHTML = `
    <figure><img class="h-[120px] mt-10" src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>Price : <span id="this-price"> 1300 </span> $</p>
      <div class="card-actions  justify-center">
        <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary btn-xs">Show Details</button>
      </div>
      <button id="this-btn" onclick ="theButton()" class="btn btn-accent btn-xs">Buy Now</button>
    </div>
  </div>
    `
phoneContainer.appendChild(phoneCard);
});
toggleLoading(false);

}

const handleShowDetails = async (id) =>{
// console.log('ami asi', id)
// phone data
const res = await fetch(`
https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json();
const mobile = data.data
console.log(mobile)
showPhone(mobile)
}


const showPhone = (mobile) =>{
  console.log(mobile)

  const jewel = document.getElementById('phone-name');
  jewel.innerText = mobile.name;

const detailShow = document.getElementById('show-detail-container');
detailShow.innerHTML = `
<img class="ml-28 h-36 w-28" src="${mobile.image}" alt="" />
<p><span>Brand Name : </span>${mobile.brand}</p>
<p><span>Storage: </span>${mobile.mainFeatures.storage}</p>
<p><span>Memory: </span>${mobile.mainFeatures.memory}</p>
<p><span>Display Size: </span>${mobile.mainFeatures.displaySize}</p>
<p><span>WLAN: </span>${mobile.others.WLAN}</p>
<p><span>Bluetooth: </span>${mobile.others.Bluetooth}</p>
<p><span>Gps: </span>${mobile.others.GPS}</p>
<p><span>NFC: </span>${mobile.others.NFC}</p>
<p><span>Radio: </span>${mobile.others.Radio}</p>
`
  show_details_modal.showModal()
 
}


const handleSearch = () =>{
  toggleLoading(true)
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value;
    console.log(searchText)
    loadPhone(searchText)
    

}

const toggleLoading = (isLoading) =>{
const loading = document.getElementById('loading');
if(isLoading){
  loading.classList.remove('hidden')
}
else{
  loading.classList.add('hidden')
}
}

let count = 0;


const theButton = () =>{

count = count + 1;


    const priceMoney = document.getElementById('this-price');
    const result = priceMoney.innerText;
    const convert = parseInt(result);
    const totalMoney = document.getElementById('Total').innerText;
    const converted = parseInt(totalMoney);
    const finalResult = convert + converted;
    document.getElementById('Total').innerText = finalResult;
 
    
}


loadPhone();