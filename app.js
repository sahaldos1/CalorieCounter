//storage controller for local storage, item controller for items, ui controller for ui, main controller where everything meets

//when we return from module those are public methods or variables

//Storage Controller

//Item Controller

//set to iffy which runs right away
const ItemCtrl = (function () {
  //item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data strucure/state
  const data = {
    items: [
      // { id: 0, name: "Pizza", calories: 1200 },
      // { id: 1, name: "Steak", calories: 800 },
      // { id: 2, name: "Pasta", calories: 1300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    logData: function () {
      return data;
    },
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;

      //create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //calories to number
      calories = parseInt(calories);

      //create new item
      newItem = new Item(ID, name, calories);

      //add to items array
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories: function () {
      let total = 0;

      //loop through items and att total
      data.items.forEach(function (item) {
        total += item.calories;
      });

      //set total calories to wahteer the total is
      data.totalCalories = total;

      //return total
      return data.totalCalories;
    },
    getItemById: function (id) {
      let found = null;

      //loop thorough items

      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    updateItem: function (name, calories) {
      //calorie sto number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: function (id) {
      //get ids
      ids = data.items.map(function (item) {
        return item.id;
      });

      //get index
      const index = ids.indexOf(id);

      //remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function () {
      data.items = [];
    },
  };
})();

//UI controller
const UICtrl = (function () {
  const UISelectors = {
    listItems: "#item-list li",
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBTN: ".clear-btn",
  };

  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      //insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    getSelectors: function () {
      return UISelectors;
    },
    addListItem: function (item) {
      //show the list
      document.querySelector(UISelectors.itemList).style.display = "block";

      //create li element
      const li = document.createElement("li");

      //add class and id
      li.className = "collection-item";
      li.id = `item-${item.id}`;

      //add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

      //insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();

      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    addItemToForm: function () {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //turn nodelist into array
      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {
        const itemId = listItem.getAttribute("id");

        if (itemId === `item-${item.id}`) {
          document.querySelector(
            `#${itemId}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;

      const item = document.querySelector(itemID);

      item.remove();
    },
    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //turn nodelist into array
      listItems = Array.from(listItems);

      listItems.forEach(function (item) {
        item.remove;
      });
    },
  };
})();

//App Controller
const App = (function (ItemCtrl, UICtrl) {
  //load event listeners
  const loadEventListeners = function () {
    //get UI selectors from ui controller
    const UISelectors = UICtrl.getSelectors();

    //add item event

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    //disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //edit icon click
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    //update item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    //delete event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    //back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    //clear all button event

    document
      .querySelector(UISelectors.clearBTN)
      .addEventListener("click", clearAllItemsClick);
  };

  //Add Item Submit
  const itemAddSubmit = function (e) {
    //get form input from ui controller

    const input = UICtrl.getItemInput();

    //check for name and calories
    if (input.name !== "" && input.calories !== "") {
      //add item

      const newItem = ItemCtrl.addItem(input.name, input.calories);

      //add item to list
      UICtrl.addListItem(newItem);

      //get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //add total caloires to ui
      UICtrl.showTotalCalories(totalCalories);

      //clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  //click edit item
  const itemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      //get list item id
      const listId = e.target.parentNode.parentNode.id;

      //break into an array
      const listIdArr = listId.split("-");

      //get the actual id
      const id = parseInt(listIdArr[1]);

      //get item
      const itemToEdit = ItemCtrl.getItemById(id);

      //set current item

      ItemCtrl.setCurrentItem(itemToEdit);

      //add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  //update item submit
  const itemUpdateSubmit = function (e) {
    e.preventDefault();

    //get item input
    const input = UICtrl.getItemInput();

    //update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //update ui
    UICtrl.updateListItem(updatedItem);

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //add total caloires to ui
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  };

  //delete item submit
  const itemDeleteSubmit = function (e) {
    //get current item
    const currentItem = ItemCtrl.getCurrentItem();

    //delete form datastructure
    ItemCtrl.deleteItem(currentItem.id);

    //delete form ui
    UICtrl.deleteListItem(currentItem.id);

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //add total caloires to ui
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  //clear all items button
  const clearAllItemsClick = function (e) {
    //Delete all items form data structure

    ItemCtrl.clearAllItems();

    //remove from ui
    UICtrl.removeItems();

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //add total caloires to ui
    UICtrl.showTotalCalories(totalCalories);

    //hide list
    UICtrl.hideList();
  };

  //public methods
  return {
    init: function () {
      //clear edit state
      UICtrl.clearEditState();

      //getch items from data structure
      const items = ItemCtrl.getItems();

      //check if list has any items or not
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //populate list with items
        UICtrl.populateItemList(items);
      }

      //get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //add total caloires to ui
      UICtrl.showTotalCalories(totalCalories);

      //load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

//initialize app
App.init();
