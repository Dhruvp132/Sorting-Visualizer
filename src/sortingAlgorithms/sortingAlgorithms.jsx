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
  animations
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
  animations
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

//====== Quick Sort ================
export function getQuickSortAnimation(array) {
  const animations = [];
  const pivotAnimation = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations, pivotAnimation);
  return {animations, pivotAnimation};
}

function quickSortHelper(mainArray, low, high, animations, pivotAnimation) {
  if (low < high) {
    let partIdx = partition(mainArray, low, high, animations);
    pivotAnimation.push(partIdx);
    quickSortHelper(mainArray, low, partIdx - 1, animations, pivotAnimation);
    quickSortHelper(mainArray, partIdx + 1, high, animations, pivotAnimation);
  }
}

function partition(mainArray, low, high, animations) {
  let pivot = mainArray[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (mainArray[j] < pivot) {
      i++;
      
      let temp = mainArray[i];
      mainArray[i] = mainArray[j];
      mainArray[j] = temp;
      animations.push([i,j]);
      animations.push([i,j]);
      // [mainArray[i], mainArray[j]] = [mainArray[j], mainArray[i]]; // Swap elements
      animations.push([i, mainArray[j], j, temp]);
    }
  }

  animations.push([i+1, high]);
  animations.push([i+1, high]);
  let temp = mainArray[i + 1];
  mainArray[i + 1] = mainArray[high];
  mainArray[high] = temp;
  // [mainArray[i + 1], mainArray[high]] = [mainArray[high], mainArray[i + 1]]; // Swap pivot to its correct position
  animations.push([i + 1, mainArray[i + 1], high, temp]);
  return i + 1;
}

//========== Bubble sort ================
export function getBubbleSortAnimation(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(0, array.length, array, animations);
  return animations;
}

function bubbleSortHelper(startIdx, endIdx, mainArray, animations) {
  for (let i = startIdx; i < endIdx - 1; i++) {
    for (let j = i; j < endIdx - 1; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (mainArray[j] > mainArray[j + 1]) {
        let temp = mainArray[j];
        mainArray[j] = mainArray[j + 1];
        mainArray[j + 1] = temp;
        // previously used s1 -> array[j+1] = s1 and s2 -> array[j] animations.push(j, s1, j+1, s2)
        // animations.push([j, auxiliaryArray[j+1], j+1, auxiliaryArray[j]]) mistake in this line after swapping values ..
        animations.push([j, mainArray[j], j + 1, temp]);
      } else {
        animations.push([j, mainArray[j], j + 1, mainArray[j + 1]]);
      }
    }
  }
}

// Note 2 baar compare kare then swap bubble sort logic for animations
