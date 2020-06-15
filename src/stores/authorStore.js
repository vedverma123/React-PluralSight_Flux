import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const AUTHOR_CHANGE = "AUTHOR_CHANGE";
let _authors = [];

class AuthorStore extends EventEmitter {
  addChangeListener(onChange) {
    this.on(AUTHOR_CHANGE, onChange);
  }

  removeChangeListener(onChange) {
    this.removeListener(AUTHOR_CHANGE, onChange);
  }

  emitChange() {
    this.emit(AUTHOR_CHANGE);
  }

  getAuthors() {
    return _authors;
  }

  getAuthorById(id) {
    return _authors.find((author) => author.id === id);
  }
}

const authorStore = new AuthorStore();

dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      authorStore.emitChange();
      break;
    default:
      break;
  }
});

export default authorStore;
