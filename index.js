const loadPhone = async(searchText) =>{
    const res = await fetch(`
    https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phone = data.data;
    //  console.log(phone);
     displayPhone(phone)
}


const displayPhone = phone =>{
    // console.log(phone);

    const phoneContainer = document.getElementById('phone-conatiner')
    phoneContainer.textContent ='';
const showAll = document.getElementById('show-all');
    if(phone.length > 12){
      showAll.classList.remove('hidden')
    }else
  {
    showAll.classList.add('hidden')
  }

// display only 10 phones shows
    phone = phone.slice(0,10);
     
   

phone.forEach(phone => {
    // console.log(phone)

    // create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
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
<img src="${mobile.image}" alt="" />
<p><span>Storage:</span>${mobile.mainFeatures.storage}</p>
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

loadPhone();