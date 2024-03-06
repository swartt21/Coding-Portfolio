public class InsertionSorter {

    private int numberOfComparisons;
    private int numberOfArrayWrites;

    public InsertionSorter() {
        resetComparisonCount();
        resetWritesCount();
    }

    private void resetComparisonCount() {
        numberOfComparisons = 0;
    }

    private void resetWritesCount() {
        numberOfArrayWrites = 0;
    }

    private boolean lessThan(int value1, int value2) {
        numberOfComparisons += 1;
        return value1 < value2;
    }

    public void sort(int[] data) {
        resetComparisonCount();
        resetWritesCount();
        if ((data != null) && (data.length > 0)) {
            int temp;
            int i;
            int j;
            for (i = 1; i < data.length; i++) { // Insert ith record
                for (j = i; (j > 0) && lessThan(data[j], data[j-1]); j--) {
                    temp = data[j];
                    data[j] = data[j-1];
                    data[j-1] = temp;
                    numberOfArrayWrites += 2;
                }
            }
        }
    }

    public void sort2(int[] data) {
        // TODO: Remove the next line after completing this method
        System.out.println("sort2 method not implemented yet, so array will be unchanged...");
        resetComparisonCount();
        resetWritesCount();

        if ((data != null) && (data.length > 0)) {
            // TODO: Write a variant of the sort method that reduces the number of array writes
            //for loop interates through the the array
            for (int i = 1; i < data.length; i++) {
                int currentNum = data[i];
                int j = i - 1;

                //shifts elements of data over that are greater than var currentNum to one ahead of their current position.
                while(j >= 0 && lessThan(currentNum, data[j])) {
                    data[j + 1] = data[j];
                    j--;
                }

                //places the currentNum after the last shifted value
                data[j + 1] = currentNum;
                if (i != j + 1) {
                    numberOfArrayWrites += i - (j + 1);
                    numberOfArrayWrites++;
                }
            }
        }
    }

    public int getNumberOfComparisons() {
        return numberOfComparisons;
    }

    public int getNumberOfArrayWrites() {
        return numberOfArrayWrites;
    }
}