import { gettingData, newPostEvent } from './firebasefunction.js';

export default () => {
    const template = document.querySelector('#template-events');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);

    const container = document.querySelector('.container-all-post');
    container.textContent = 'Share Events!';

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    const photoUser = document.querySelector('.user-img');
    const nameTimeline = document.querySelector('.user-name');
    const formShare = document.querySelector('.form-share');

    //Traer nombre y foto correctamente
    gettingData('users', uid).then((doc) => {
        photoUser.src = doc.photoURL;
        nameTimeline.textContent = doc.name;
    });


    formShare.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputEvent = document.querySelector('.input-event').value;
        const inputCity = document.querySelector('.input-city').value;
        const inputDate = document.querySelector('.input-date').value;
        const inputPlace = document.querySelector('.input-place').value;
        const inputHour = document.querySelector('.input-hour').value;

        if (inputEvent && inputDate && inputCity && inputHour && inputCity && inputPlace !== ' '){
            gettingData('users', uid).then((doc) => {

                const eventData = {
                    uid: uid,
                    event: inputEvent,
                    city: inputCity,
                    date: inputDate,
                    place: inputPlace,
                    hour: inputHour,
                    name: doc.name,
                    photo: doc.photoURL,
                    date: firebase.firestore.Timestamp.now(),
                };
    
                console.log(eventData);
    
                newPostEvent(eventData);
            });
            formShare.reset(); //termina nuevo post
        } else {
        alert("please enter all the inputs")
        }   
    });
        const btnLogOut = document.querySelectorAll('.logout');

        btnLogOut.forEach((item) => {
            item.addEventListener('click', () => {
                logOutAccount();
                window.location.hash = '';
            });
        });

        const menuTimeline = document.querySelectorAll('.menu-timeline');

        menuTimeline.forEach((item) => {
            item.addEventListener('click', () => {
                window.location.hash = 'timeline';
            });
        });

        const menuProfile = document.querySelectorAll('.menu-profile');

        menuProfile.forEach((item) => {
            item.addEventListener('click', () => {
                window.location.hash = 'profile';
            });
        });
    }