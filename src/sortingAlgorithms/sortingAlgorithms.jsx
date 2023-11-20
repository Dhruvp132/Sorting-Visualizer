export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }


  //========== Bubble sort ================
  export function getBubbleSortAnimation(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(0, array.length , array, animations);
    return animations;
  }



  // ==== Work in progress ========
  function bubbleSortHelper( startIdx, endIdx, mainArray, animations){
    for(let i=startIdx; i<endIdx-1; i++) {
      for(let j=i; j<endIdx-1; j++) {
        animations.push([j, j+1])
        animations.push([j, j+1])
        if (mainArray[j]>mainArray[j+1]){
          //Work in progress causing delay in animation after 1 iteration
          let temp = mainArray[j];
          mainArray[j] = mainArray[j + 1];
          mainArray[j + 1] = temp;
          // previously used s1 -> array[j+1] = s1 and s2 -> array[j] animations.push(j, s1, j+1, s2)
          // animations.push([j, auxiliaryArray[j+1], j+1, auxiliaryArray[j]]) mistake in this line after swapping values ..
          animations.push([j, mainArray[j], j+1, temp])
        }else {
          animations.push([j, mainArray[j], j+1, mainArray[j+1]])
        }
      }
    }
  }