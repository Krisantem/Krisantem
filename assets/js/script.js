// *****************************************************************************************
//                                     TYPEWRITER 1
// *****************************************************************************************

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


// *****************************************************************************************
//                                     TYPEWRITER 2
// *****************************************************************************************

// https://codepen.io/acarlie/pen/KOqmPN

class Typewriter{
    constructor(id, arr){
      this.el = document.getElementById(id);
      this.period = 200;
      this.interval = '';
      this.deleteInterval = '';
      this.word = '';
      this.add = true;
      this.textArray = arr;
    }
    type(){
      var self = this;
      this.letter = 0;
      this.counter = 0;
      clearInterval(this.interval);
      this.interval = setInterval(function(){ self.addLetters(); }, this.period);
    }
    setWord(){
      this.word = this.textArray[this.counter];
    }
    deleteLetters(){
      if (this.letter > 0 && !this.add) {
        this.letter--;
        var textContent = this.el.textContent;
        this.el.textContent = textContent.substring(0, this.letter);
      } else if (this.letter === 0 && !this.add) {
        this.add = true;
        this.el.innerHTML = '';
        this.counter++;
        this.setWord();
        this.startAdd();
      }
    }
    addLetters(){
      var self = this;
      if (this.counter === this.textArray.length) {
        this.type();
      } else {
        this.setWord();
        if (this.letter < this.word.length && this.add) {
          this.el.textContent += this.word[this.letter];
          this.letter++;
        } else if (this.letter === this.word.length && this.add) {
          this.add = false;
          document.getElementById('blinker').classList = "blink";
          setTimeout(function () { self.startDelete(); }, 1500);
        }
      }
    }
    startDelete(){
      var self = this;
      document.getElementById('blinker').classList = "";
      clearInterval(this.interval);
      this.interval = setInterval(function () { self.deleteLetters(); }, this.period);
    }
    startAdd(){
      var self = this;
      clearInterval(this.interval);
      this.interval = setInterval(function () { self.addLetters(); }, this.period);
    }
  }
  
  let tour = 1
  var type = new Typewriter('type', ["Développeur Web Full-Stack", "Développeur Applications"]);
  type.type();
  


// *******************************************************************************************
// *******************************************************************************************

let scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#menuPrincipal'
});


// let cardCompetences = document.querySelectorAll('section#competences div.cardCompetences');

// for (let i = 0; i < cardCompetences.length; i++) {
//     cardCompetences[i].addEventListener('mouseover', function () {
//         this.classList.add('animate__animated', 'animate__zoomIn');
//     });
//     cardCompetences[i].addEventListener('mouseleave', function () {
//         this.classList.remove('animate__animated', 'animate__zoomIn');
//     });
// }

let cardDiplomes = document.querySelectorAll('section#diplomes div.cardDiplomes');
let mouseover = false;

for (let i = 0; i < cardDiplomes.length; i++) {
    cardDiplomes[i].addEventListener('mouseover', function () {
        let heading5 = this.getElementsByTagName('h5');
        let paragraph = this.getElementsByTagName('p');

        // https://gist.github.com/maximevaly/2427604

        // Getting the font size of an element can be tricky
  
        // no fontSize :-/
        // console.log('h5.style.fontSize = ' + heading5[0].style.fontSize) + '\n';
        // console.log('h5.style[\'fontSize\'] = ' + heading5[0].style['fontSize'] + '\n');
        // console.log('h5.style[\'font-size\'] = ' + heading5[0].style['font-size'] + '\n');

        // the result is the same with bar.style['fontSize'] and bar.style['font-size']

        // we have to use this function
        // http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
        function getStyle(el, cssprop) {
            if (el.currentStyle) // IE & Opera
                return el.currentStyle[cssprop];
            else if (document.defaultView && document.defaultView.getComputedStyle) // Gecko & WebKit
                return document.defaultView.getComputedStyle(el, '')[cssprop];
            else // try and get inline style
                return el.style[cssprop]; // XXX I have no idea who is using that
        }
        // console.log('getStyle=' + getStyle(heading5[0], 'fontSize') + '\n'); // don't use 'font-size'

        let taillePolice = getStyle(heading5[0], 'fontSize'); // Récupère la taille de la police sous la forme "XXpx"
        let indicePx = taillePolice.indexOf('px'); // Recherche l'emplacement de la sous-chaîne "px" dans la taille de la police
        let valueString = taillePolice.slice(0, indicePx); // Récupère indicePx caractère(s) de la chaîne taillePolice à partir du caractère numéro 0. On obtient donc la taille de la police sous forme de chaîne de caractères
        let value = parseInt(valueString, 10); // récupère la taille de la police sous forme numérique
        value += 1;
        this.style.color = "mediumvioletred";

        if (!mouseover) {
            heading5[0].style.fontSize = value.toString(10) + 'px';
            // Other methods :
            // Set a "style" attribute on the element:
            // heading5[0].setAttribute('style', 'font-size: ' + value.toString(10) + 'px');
            // Modify the cssText property of the style object:
            // heading5[0].style.cssText = 'font-size: ' + value.toString(10) + 'px';
        }
        mouseover = true;

        paragraph[0].style.fontWeight = "bold";

    });
    cardDiplomes[i].addEventListener('mouseleave', function () {
        let heading5 = this.getElementsByTagName('h5');
        let paragraph = this.getElementsByTagName('p');
        mouseover = false;
        this.style.color = "";
        heading5[0].style.fontSize = "";
        paragraph[0].style.fontWeight = "";
    });
}

let cardContact = document.querySelectorAll('section#contact div.cardContact');

for (let i = 0; i < cardContact.length; i++) {
    cardContact[i].addEventListener('mouseover', function () {
        // On récupère tous les éléments de type "p" contenus chaque l'élément ayant l'id cardContact
        let paragraph = this.getElementsByTagName('p');
        // Il n'y a qu'un élément de type "p" dans chaque élément ayant l'id cardContact, donc cet élément de type "p" a l'indice 0
        paragraph[0].style.color = "mediumvioletred";
        paragraph[0].style.fontWeight = "bold";
    });

    cardContact[i].addEventListener('mouseleave', function () {
        let paragraph = this.getElementsByTagName('p');
        paragraph[0].style.color = "";
        paragraph[0].style.fontWeight = "";
    });
}

window.addEventListener("resize", function () {
    if (window.innerWidth <= 767) {
        let spanDiplomes = document.querySelectorAll('section#diplomes span.diplomes');
        for (let i = 0; i < spanDiplomes.length; i++) {
            spanDiplomes[i].classList.add('col-2');
            spanDiplomes[i].dataset.aos = "fade-up";
        }

        let spanContact = document.querySelectorAll('section#contact span.contact');
        for (let i = 0; i < spanContact.length; i++) {
            spanContact[i].classList.add('col-2');
            spanContact[i].dataset.aos = "fade-up";
        }
    } else {
        let spanDiplomes = document.querySelectorAll('section#diplomes span.diplomes');
        for (let i = 0; i < spanDiplomes.length; i++) {
            spanDiplomes[i].classList.remove('col-2');
            spanDiplomes[i].dataset.aos = "fade-left";
        }

        let spanContact = document.querySelectorAll('section#contact span.contact');
        for (let i = 0; i < spanContact.length; i++) {
            spanContact[i].classList.remove('col-2');
            spanContact[i].dataset.aos = "fade-left";
        }
    }
});


// let buttonsForm = document.querySelectorAll('section#contact form#formContact button');

// for (let i = 0; i < buttonsForm.length; i++) {
//     buttonsForm[i].addEventListener('mouseenter', function () {
//         this.classList.remove("w3-blue");
//         this.classList.add("w3-teal");
//         this.style.boxShadow = "0 0 5px 0 rgba(#FF, #FF, #FF, .8)";
//     });
//     buttonsForm[i].addEventListener('mouseleave', function () {
//         this.classList.remove("w3-teal");
//         this.classList.add("w3-blue");
//     });
// }

// let buttonEffacer = document.getElementById('buttonEffacer');
// let formContact = document.getElementById('formContact');
// let formInputs = formContact.getElementsByTagName("input");
// let formTextareas = formContact.getElementsByTagName("textarea");

// buttonEffacer.addEventListener ('click', function () {
//     for (let i = 0; i < formInputs.length; i++) {
//       formInputs[i].value = "";
//     }
//     for (let i = 0; i < formTextareas.length; i++) {
//       formTextareas[i].value = "";
//     }
// });


/*
************************************************************************************************
*                                        Scroll Button                                         *
************************************************************************************************
*/

// https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

//Get the button :
let myButton = document.getElementById('myBtn');

// http://w3schools-fa.ir/jsref/event_onscroll.html
// https://www.codeguage.com/courses/js/events-scroll-event

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {ScrollFunction()};

/*
équivaut à
document.body.onscroll = function() {ScrollFunction()};
window.addEventListener("scroll", function() {ScrollFunction()});
document.body.addEventListener("scroll", function() {ScrollFunction()});

/*
Note that in place of window we can also use document.body, as both of them refer to the same onscroll handler:

You give an onscroll handler to document.body, it will be applied to window; you give it to window, it will be applied to document.body.

They both are simply interchangeable!

However, for simplicity, developers often use window - come on, it’s seven characters shorter!
*/

function ScrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.display = "block";
    } else {
        myButton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function TopFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// ************************************************************************************************
