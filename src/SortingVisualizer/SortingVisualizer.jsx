import React, { Component } from "react";
import {getMergeSortAnimations, getBubbleSortAnimation} from '../sortingAlgorithms/sortingAlgorithms'
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#00bfff';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = { array: [] };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 650));
    }
    //reset the state to have this new array
    this.setState({ array });

  }


  //====== Sorting Methods ================
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations)
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      // Now, arrayBars is a collection of all elements with class 'array-bar'
  // You can access individual elements using array indexing
      console.log(arrayBars)
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        console.log(animations[i])
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          //[1, 12]
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  } 


  bubbleSort() {
    const animations = getBubbleSortAnimation(this.state.array)
    console.log(animations)
    for(let i=0; i<animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar')
      const isColorChange = i % 3 !== 2; // has true or false 
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else { 
        setTimeout(()=> {
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo ] = animations[i]
          const barOneStyle = arrayBars[barOneIdx].style//add .style 
          const barTwoStyle = arrayBars[barTwoIdx].style //add .style 
          barOneStyle.height = `${newHeightOne}px`
          barTwoStyle.height = `${newHeightTwo}px`
          // barOneStyle.innerHTML = `${newHeightOne}px`
          // barTwoStyle.innerHTML = `${newHeightTwo}px`
        }, i * ANIMATION_SPEED_MS)
      }
    }
  }
  testSortingAlgorithm() {
    for(let i=0; i<100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000)
      for(let i=0; i<length; i++) {
        array.push(randomIntFromInterval(-1000, 1000))
      }
      const javaScriptSortedArray = this.state.array.slice().sort((a,b) => a-b);
      const mergeSortedArray = getMergeSortAnimations(this.state.array);

      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray))
    }
  }


  render() {
    const { array } = this.state;

    return (
      <>
      <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">Sorting Visualizer</span>
  </div>
</nav>
        <div className="array-container" style={{ margin : '10px'}}> 
        {array.map((value, idx) => (
          // if you don't put key in react it gives a warning in console
          <div className="array-bar" 
          key={idx}
          style={{height: `${value}px`}}></div>
        ))}
        </div> 
        <div className="container" >
        <button type='button' style={{ margin : '5px'}} className='btn btn-outline-dark' onClick={()=> this.mergeSort()}>Merge Sort Array</button>
        <button type='button' style={{ margin : '5px'}} className='btn btn-outline-dark' onClick={()=> this.bubbleSort()}>Bubble Sort Array</button>
        <button type='button' style={{ margin : '5px'}} className='btn btn-outline-dark' onClick={()=>this.resetArray()}>Generate new Array</button>
        </div>
      </>
    );
  }
}
export default SortingVisualizer;


function randomIntFromInterval(min, max) {
  //min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


//To check wether the arrayAreEqual, achieved by comparing 2 arrays
function arraysAreEqual(arrayOne, arrayTwo) {
  if(arrayOne.length !== arrayTwo.length) return false;
  for(let i=0; i<arrayOne.length; i++) {
    if(arrayOne[i] !== arrayTwo[i]) return false
  }
  return true;
}