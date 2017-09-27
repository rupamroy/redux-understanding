const { createStore, applyMiddleware } = require('redux');

const defaultState = {
  courses: [
    {
      name: 'Learning React',
      topic: 'React',
    },
    {
      name: 'Learning Angular',
      topic: 'Angular',
    },
    {
      name: 'Using Redux with Angular',
      topic: 'Angular',
    }
  ]
};

function reducer(state, action){
  // Based on action
  switch(action.type) {
    case 'ADD_COURSE':
      // changes the state through a pure function 
      return Object.assign({},state, {
        courses : [...state.courses, action.course]
      });
    default: 
      return state;
  }
}

// No need to understand this function
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('state after action', store.getState());
  return result;
}

const store = createStore(reducer, defaultState, applyMiddleware(logger));

function addView(viewFunc) {
  // render view initial get intial state
  viewFunc(defaultState);

  // Subscription to state changes
  store.subscribe(() => {
    // updates the view
    viewFunc(store.getState());
  })
}

addView((state) => {
  console.log(`There are ${state.courses.length} courses in the library`);
});

addView((state) => {
  console.log(`The latest course in the library: ${state.courses[state.courses.length -1].name}`);
});

// Trigger an action after the view has been rendered
store.dispatch({
  type: 'ADD_COURSE',
  course: {
    name: "New course",
    topic: 'Does not matter'
  }
});
