import java.util.ArrayList;

public class DFSMTabular {

    int numberOfStates;
    int numberOfAlphabetSymbols;
    ArrayList<Boolean> acceptingStates;
    int[][] table;

    public DFSMTabular() {
        numberOfStates = 7;
        numberOfAlphabetSymbols = 6; // For the symbols {a, b, c, +, (, )}

        // Initialize the table and accepting states list
        table = new int[numberOfStates][numberOfAlphabetSymbols];
        acceptingStates = new ArrayList<>(numberOfStates);
        for (int i = 0; i < numberOfStates; i++) {
            acceptingStates.add(false); // Initially mark all states as non-accepting
        }

        // Setup accepting states based on the language requirements and assuming states 5 and 6 are accepting as per our discussion
        acceptingStates.set(5, true); // State after completing 'a+b' or 'c(a+b)'
        acceptingStates.set(6, true); // State after completing '(a+b)' or its repetitions

        // Initialize transitions for the Finite State Machine
        initializeTransitions();
    }

    private void initializeTransitions() {
        // Handling 'c' prefix leading to a word
        table[0][2] = 1; // S0 -> S1 on 'c'
        table[1][4] = 2; // S1 -> S2 on '('

        // Opening a word without 'c'
        table[0][4] = 2; // S0 -> S2 on '(' directly

        // Inside a word or starting directly with 'a+b'
        table[0][0] = 3; // S0 -> S3 on 'a' (direct start with 'a+b')
        table[2][0] = 3; // S2 -> S3 on 'a' within '('
        table[3][3] = 4; // S3 -> S4 on '+'
        table[4][1] = 5; // S4 -> S5 on 'b'

        // Closing a word
        table[5][5] = 6; // S5 -> S6 on ')'

        // Handling repeated '(a+b)' patterns
        table[6][4] = 2; // S6 -> S2 on '(' for next '(a+b)'

        // Reset to handle 'a+b' after completing a word or 'a+b'
        table[5][0] = 3; // S5 -> S3 on 'a' if it follows directly after 'b' (for 'a+b')
    }

    // Converts a symbol to its corresponding integer index
    private int symbolToInt(char symbol) {
        return switch (symbol) {
            case 'a' -> 0;
            case 'b' -> 1;
            case 'c' -> 2;
            case '+' -> 3;
            case '(' -> 4;
            case ')' -> 5;
            default -> -1; // For invalid symbols
        };
    }

    private int nextState(int currentState, char symbol) {
        int symbolIndex = symbolToInt(symbol);
        if (symbolIndex < 0 || symbolIndex >= numberOfAlphabetSymbols) {
            return -1; // Invalid transition
        }
        return table[currentState][symbolIndex];
    }

    // Checks if the word is accepted by the machine
    public boolean checkWord(String word) {
        int state = 0; // Start from initial state
        for (int i = 0; i < word.length(); i++) {
            state = nextState(state, word.charAt(i));
            if (state == -1) return false; // Transition to an invalid state
        }
        return acceptingStates.get(state); // Check if ending state is accepting
    }
}
