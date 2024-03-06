import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

public class PartC {
    public static void main(String[] args) {
        InsertionSorter insertionSorter = new InsertionSorter();

        Random randomGenerator = new Random();
        int i;
        int collectionSize = 50000;
        int[] bigCollectionArray;
        ArrayList<Integer> bigCollectionArrayList;

        bigCollectionArrayList = new ArrayList<Integer>(collectionSize);
        int upperBoundForValues = 3 * collectionSize;
        for (i = 0; i < collectionSize; i++) {
            bigCollectionArrayList.add(randomGenerator.nextInt(upperBoundForValues));
        }

        int trials = 1000;
        double comparisonCountSum = 0;
        System.out.println("Starting trials...");
        for (i = 1; i <= trials; i++) {
            // generate a permutation of the values in the ArrayList
            Collections.shuffle(bigCollectionArrayList);
            // convert the ArrayList of Integer objects to an array of int primitives
            bigCollectionArray = bigCollectionArrayList.stream().mapToInt(Integer::intValue).toArray();
            // sort the array of int primitives
            insertionSorter.sort(bigCollectionArray);
            // keep a running sum of the number of comparisons required over the set of trials
            comparisonCountSum += insertionSorter.getNumberOfComparisons();
            // every 50th trial, print out the average number of comparisons required
            if ((i % 200) == 0) {
                System.out.println("On trial: " + i);
            }
        }
        System.out.println("Average number of comparisons required for collection of size " + collectionSize + " : " + (comparisonCountSum / trials));
    }
}