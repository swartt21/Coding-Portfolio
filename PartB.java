import java.util.Arrays;

public class PartB {
    public static void main(String[] args) {
        InsertionSorter insertionSorter = new InsertionSorter();

        int[] data = {5,4,3,2};
        int[] data2 = new int[data.length];
        System.arraycopy(data, 0, data2, 0, data.length);

        System.out.println("Data Set 1");
        System.out.println("Before sorting with sort(): " + Arrays.toString(data));
        insertionSorter.sort(data);
        System.out.println("After sorting with sort(): " + Arrays.toString(data));
        System.out.println("Number of array writes performed by sort() method: " + insertionSorter.getNumberOfArrayWrites());

        System.out.println("Data Set 2");
        System.out.println("Before sorting with sort2(): " + Arrays.toString(data2));
        insertionSorter.sort2(data2);
        System.out.println("After sorting with sort2(): " + Arrays.toString(data2));
        System.out.println("Number of array writes performed by sort2() method: " + insertionSorter.getNumberOfArrayWrites());
    }
}