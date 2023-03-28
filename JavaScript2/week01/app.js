"use strict";

{
  const bookTitles = [
    "where_the_crawdads_sing",
    "the_brothers_lionheart",
    "mio_my_son",
    "dr_jekyll_and_mr_hyde",
    "harry_potter_chamber_secrets",
    "prisoner_of_azkaban",
    "goblet_of_fire",
    "order_of_the_phoenix",
    "half_blood_prince",
    "dealthly_hallows",
  ];

  const booksObj = {
    where_the_crawdads_sing: {
      title: "Where the crawdads sing",
      author: "Delia Owens",
      language: "English",
    },
    the_brothers_lionheart: {
      title: "Bröderna Lejonhjärta",
      author: "Astrid Lindgren",
      language: "Swedish",
    },
    mio_my_son: {
      title: "Mio min Mio",
      author: "Astrid Lindgren",
      language: "Swedish",
    },
    dr_jekyll_and_mr_hyde: {
      title: "Dr Jekyll and Mr Hyde",
      author: "Robert Louis Stevenson",
      language: "English",
    },
    harry_potter_chamber_secrets: {
      title: "Гарри Поттер и Тайная комната",
      author: "J. K. Rowling",
      language: "Russian",
    },
    prisoner_of_azkaban: {
      title: "Гарри Поттер и Узник Азкабана",
      author: "J. K. Rowling",
      language: "Russian",
    },
    goblet_of_fire: {
      title: "Гарри Поттер и Кубок Огня",
      author: "J. K. Rowling",
      language: "Russian",
    },
    order_of_the_phoenix: {
      title: "Гарри Поттер и Орден Феникса",
      author: "J. K. Rowling",
      language: "Russian",
    },
    half_blood_prince: {
      title: "Гарри Поттер и Принц-полукровка",
      author: "J. K. Rowling",
      language: "Russian",
    },
    dealthly_hallows: {
      title: "Гарри Поттер и Дары смерти",
      author: "J. K. Rowling",
      language: "Russian",
    },
  };

  const covers = {
    where_the_crawdads_sing: "./img/1.jpg",
    the_brothers_lionheart: "./img/2.jpg",
    mio_my_son: "./img/3.jpg",
    dr_jekyll_and_mr_hyde: "./img/4.jpg",
    harry_potter_chamber_secrets: "./img/5.jpg",
    prisoner_of_azkaban: "./img/6.jpg",
    goblet_of_fire: "./img/7.jpg",
    order_of_the_phoenix: "./img/8.jpg",
    half_blood_prince: "./img/9.jpg",
    dealthly_hallows: "./img/10.jpg",
  };
  function makeUL(array) {
    let listOfBooks = document.createElement("ul");

    for (let i = 0; i < array.length; i++) {
      let item = document.createElement("li");
      item.appendChild(document.createTextNode(array[i]));
      listOfBooks.appendChild(item);
    }
    return listOfBooks;
  }

  ///  document.body.appendChild(makeUL(bookTitles));

  function makeULObj(array, object) {
    let listOfBooks = document.createElement("ul");

    for (let i = 0; i < array.length; i++) {
      let item = document.createElement("li");
      item.setAttribute("id", array[i]);
      let book = object[array[i]];
      let header = document.createElement("h2");
      let textHeader = document.createTextNode(book.title);
      item.appendChild(header);
      header.appendChild(textHeader);
      ///creating additional information
      let paragraph = document.createElement("p");
      let authorParagraph = document.createTextNode(book.author);
      let languageParagraph = document.createTextNode(book.language);
      item.appendChild(paragraph);
      paragraph.appendChild(authorParagraph);
      ///making line break
      let linebreak = document.createElement("br");
      paragraph.appendChild(linebreak);
      paragraph.appendChild(languageParagraph);
      listOfBooks.appendChild(item);
      addCover(array[i], covers, item, booksObj);
    }
    return listOfBooks;
  }

  function addCover(key, obj, item, objWithBooks) {
    let url = obj[key];
    let img = document.createElement("img");
    img.src = url;
    //add alt
    let objWithAbook = objWithBooks[key];
    let alt = objWithAbook.title;
    img.setAttribute("alt", alt);
    item.appendChild(img);
  }

  makeULObj(bookTitles, booksObj);
  document.body.appendChild(makeULObj(bookTitles, booksObj));
}
