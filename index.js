


const prizes = [
    {
      text: "500 000",
      color: "#fff",
      font: "#E5474C",
    },
    { 
      text: "380 000",
      color: "#E5474C",
      font: "#fff",
    },
    { 
      text: "100 000",
      color: "#fff",
      font: "#E5474C",
    },
    {
      text: "50 000",
      color: "#E5474C",
      font: "#fff",
    },
    {
      text: "20 000",
      color: "#fff",
      font: "#E5474C",
    },
    {
      text: "Роутера Mercusis ac1200",
      color: "#E5474C",
      font: "#fff",
    },
    {
      text: "ТВ приставки TX-6",
      color: "#fff",
      font: "#E5474C",
    },
    {
      text: "Промо-коды на кинотеатр Амедиатека",
      color: "#E5474C",
      font: "#fff",
      
    },
    
];
  
  // создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
  const wheel = document.querySelector(".deal-wheel");
  const spinner = wheel.querySelector(".spinner");
  const trigger = wheel.querySelector(".btn-spin");
  const ticker = wheel.querySelector(".ticker");
  let isPlayed = false
  let user = {
    login:'',
    tel:''
  }
  let aviablePrizes = []
  let order = 1
  
  // на сколько секторов нарезаем круг
  const prizeSlice = 360 / prizes.length;
  // на какое расстояние смещаем сектора друг относительно друга
  const prizeOffset = Math.floor(180 / prizes.length);
  // прописываем CSS-классы, которые будем добавлять и убирать из стилей
  const spinClass = "is-spinning";
  const selectedClass = "selected";
  // получаем все значения параметров стилей у секторов
  const spinnerStyles = window.getComputedStyle(spinner);
  
  // переменная для анимации
  let tickerAnim;
  // угол вращения
  let rotation = 0;
  // текущий сектор
  let currentSlice = 0;
  // переменная для текстовых подписей
  let prizeNodes;
  
  // расставляем текст по секторам
  const createPrizeNodes = () => {
    // обрабатываем каждую подпись
    prizes.forEach(({ text, font, reaction }, i) => {
      // каждой из них назначаем свой угол поворота
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      // добавляем код с размещением текста на страницу в конец блока spinner
      spinner.insertAdjacentHTML(
        "beforeend",
        // текст при этом уже оформлен нужными стилями
        `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
          <span style="color: ${font}" class="text">${text}</span>
        </li>`
      );
    });
  };
  
  // рисуем разноцветные секторы
  const createConicGradient = () => {
    // устанавливаем нужное значение стиля у элемента spinner
    spinner.setAttribute(
      "style",
      `background: conic-gradient(
        from -90deg,
        ${prizes
          // получаем цвет текущего сектора
          .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
          .reverse()
        }
      );`
    );
  };
  
  // создаём функцию, которая нарисует колесо в сборе
  const setupWheel = () => {
    // сначала секторы
    createConicGradient();
    // потом текст
    createPrizeNodes();
    // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
    prizeNodes = wheel.querySelectorAll(".prize");
  };
  
  // определяем количество оборотов, которое сделает наше колесо
  const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // функция запуска вращения с плавной остановкой
  const runTickerAnimation = () => {
    // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
    const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];  
    let rad = Math.atan2(b, a);
    
    if (rad < 0) rad += (2 * Math.PI);
    
    const angle = Math.round(rad * (180 / Math.PI));
    const slice = Math.floor(angle / prizeSlice);
  
    // анимация язычка, когда его задевает колесо при вращении
    // если появился новый сектор
    if (currentSlice !== slice) {
      // убираем анимацию язычка
      ticker.style.animation = "none";
      // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
      setTimeout(() => ticker.style.animation = null, 20);
      // после того, как язычок прошёл сектор - делаем его текущим 
      currentSlice = slice;
    }
    // запускаем анимацию
    tickerAnim = requestAnimationFrame(runTickerAnimation);
  };
  
  const prizeChose = (name) =>{
    if(name===prizes[0].text){
        return  Math.floor(360*6+20)
    }else if(name===prizes[1].text){
      return  Math.floor(360*6+65)
    }else if(name===prizes[2].text){
      return  Math.floor(360*6+110)
    }else if(name===prizes[3].text){
      return  Math.floor(360*6+155)
    }else if(name===prizes[4].text){
      return  Math.floor(360*6+200)
    }else if(name===prizes[5].text){
      return  Math.floor(360*6+245)
    }else if(name===prizes[6].text){
      return  Math.floor(360*6+290)
    }else if(name===prizes[7].text){
      return  Math.floor(360*6+335)
    }
    
  }
  const selectPrize = () => {
    const selected = Math.floor(rotation / prizeSlice);
    prizeNodes[selected].classList.add(selectedClass);
  };
  
  // отслеживаем нажатие на кнопку
  trigger.addEventListener("click", async() => {
    
    if( isPlayed === true){
      return
    }else{
      isPlayed = true
      trigger.disabled = true;
    }
    let superPrizes = aviablePrizes.filter(item=>item.name!=='Промо-коды на кинотеатр Амедиатека')
    console.log(order)
     if(order%2!==0||superPrizes.length==0){
      let amedia = aviablePrizes.filter(item=>item.name === 'Промо-коды на кинотеатр Амедиатека')
      rotation = prizeChose(prizes[7].text);
      let promo = await getPromo()
      addOrder(prizes[7].text)
      setTimeout(() => {  
        alert(`Промокод "${promo.name}".Активировать промокод на Амедиатеку вы можете на сайте play.tvcom.uz, в личном кабинете. После активации промокода, выберите тариф «Amediateka» и активируйте его.`)
      }, 8000);
      
      removeDevices(amedia[0].name,amedia[0].count)

    }else{
      const randomIndex = Math.floor(Math.random() * superPrizes.length);
      const randomItem = superPrizes[randomIndex]
      addOrder(randomItem.name)
      if(randomItem.name.includes('000')){
        alert(`${randomItem.name}.Бонусные единицы зачисляемые на лицевой счет нельзя вывести в денежном эквиваленте, 1 бонусная единица равна 1суму.`)
      }else if(randomItem.name==='Роутера Mercusis ac1200'){
        alert(`Wi-Fi роутер вы можете забрать у нас в офисе c 03.01.2022 до 30.01.2022 с 09:00 до 18:00, по адресу ул. Шахрисабз, д.10б (ориентир м. Айбек). При себе необходимо иметь документ удостоверяющий личность.`)
      }else if(randomItem.name==='ТВ приставки TX-6'){
        alert('ТВ-приставку вы можете забрать у нас в офисе c 03.01.2022 до 30.01.2022 с 09:00 до 18:00, по адресу ул. Шахрисабз, д.10б (ориентир м. Айбек). При себе необходимо иметь документ удостоверяющий личность.')
      } 
      rotation = prizeChose(randomItem.name);
      removeDevices(randomItem.name,randomItem.count)
    }


    prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
    // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
    wheel.classList.add(spinClass);
    // через CSS говорим секторам, как им повернуться
    spinner.style.setProperty("--rotate", rotation);
    // возвращаем язычок в горизонтальную позицию
    ticker.style.animation = "none";
    // запускаем анимацию вращение
    runTickerAnimation();
  });
  
  // отслеживаем, когда закончилась анимация вращения колеса
  spinner.addEventListener("transitionend", () => {
    cancelAnimationFrame(tickerAnim);
    rotation %= 360;
    // выбираем приз
    selectPrize();
    // убираем класс, который отвечает за вращение
    wheel.classList.remove(spinClass);
    // отправляем в CSS новое положение поворота колеса
    spinner.style.setProperty("--rotate", rotation);
    // делаем кнопку снова активной
    trigger.disabled = false;
  });
  
  // подготавливаем всё к первому запуску
  setupWheel();

 let btnSub =  document.querySelector('.submit')

 btnSub.addEventListener('click',()=>{
   const textareas = document.querySelectorAll('input')
   if(textareas[0].value&&textareas[1].value){
     axios({
      method: 'POST',
      url:`http://play.tvcom.uz:777/api/blacked/get/checker`,
      }).then(async (e)=>{
        if(!isPlayed){
          user.login = textareas[0].value
          user.tel = textareas[1].value
          order = e.data.message.length+2;
          document.querySelector('.form').style.display = 'none'
          document.querySelector('.deal-wheel').style.display = 'grid'
          document.querySelector('body').classList.add('back2')
          aviablePrizes =  await getDevices()
        }

        
      }).catch((e)=>{
         console.log(e)
      }) 
   }else{
    console.log(2)
   }
   
 })

  function getDevices(){
    return axios({
         method: 'POST',
         url:`http://play.tvcom.uz:777/api/blacked/get/device`,
           }).then((e)=>{
           let aviablePrizes = e.data.message.filter(item=>item.count!==0)
           console.log(e)
           return aviablePrizes
          }).catch((e)=>{
              console.log(e)
            })
  }
  function addOrder(podarok){
    return axios({
      method: 'POST',
      url:`http://play.tvcom.uz:777/api/blacked/set/checker`,
      params:{
        login:user.login,
        podarok,
        number:user.tel
      }
       }).then((e)=>{
        console.log(e,'add order')
     }).catch((e)=>{
         console.log(e)
       })
  }
  function removeDevices(name,count){
    return axios({
         method: 'POST',
         url:`http://play.tvcom.uz:777/api/blacked/set/device`,
         params:{
           name,
           count:count-1
         },
          }).then((e)=>{
          console.log(e)
          return aviablePrizes
        }).catch((e)=>{
            console.log(e)
          })
  }
  function getPromo(){
    return axios({
         method: 'POST',
         url:`http://play.tvcom.uz:777/api/blacked/get/amedia`,
          }).then((e)=>{
           removePromo(e.data.message[0].name)
          return e.data.message[0]
        }).catch((e)=>{
            console.log(e)
          })
  }
  function removePromo(name){
    return axios({
         method: 'POST',
         url:`http://play.tvcom.uz:777/api/blacked/remove/amedia`,
         params:{
           name
         }
          }).then((e)=>{
         
          return e.data.message[0]
        }).catch((e)=>{
            console.log(e)
          })
  }

  

//  axios({
//   method: 'POST',
//   url:`http://play.tvcom.uz:777/api/blacked/get/device`,
//     }).then((e)=>{
//     let aviablePrizes = e.data.message.filter(item=>item.count!==0)
//     let superPrizes = aviablePrizes.filter(item=>item.name !== 'Промо-коды на кинотеатр Амедиатека')
//     if(superPrizes!==0||superPrizes.length===0){
//       axios({
//         method: 'POST',
//         url:`http://play.tvcom.uz:777/api/blacked/get/amedia`,
//           }).then((e)=>{
//             let promo = e.data.message[0]
//             rotation = prizeChose(prizes[7]);
//             setTimeout(() => {
//               alert(`Промокод "${promo}".Активировать промокод на Амедиатеку вы можете на сайте play.tvcom.uz, в личном кабинете. После активации промокода, выберите тариф «Amediateka» и активируйте его.`)
//             }, 4000);
           
//             rotation = prizeChose(prizes[7].text);
//             console.log(rotation)
//             // axios({
//             //   method: 'POST',
//             //   params:{
//             //     name:promo,
//             //   },
//             //   url:`http://play.tvcom.uz:777/api/blacked/set/amedia`,
//             //     }).then((e)=>{
                  
//             //   }).catch((e)=>{
//             //     console.log(e)
//             //   }) 
//         }).catch((e)=>{
//             console.log(e)
//         })


//     }else{
//       const randomIndex = Math.floor(Math.random() * superPrizes.length);
//       const randomItem = superPrizes[randomIndex]
//       rotation = prizeChose(randomItem);
//       axios({
//         method: 'POST',
//         params:{
//           name:randomItem.text,
//           count:randomItem.count-1,
//         },
//         url:`http://play.tvcom.uz:777/api/blacked/set/device`,
//           }).then((e)=>{
//             console.log(e)
//         }).catch((e)=>{
//           console.log(e)
//         })}

//   }).catch((e)=>{
//      console.log(e)
//   }) 

