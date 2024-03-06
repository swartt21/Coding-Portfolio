#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define MAX_STRING_SIZE 20

struct WordFreq {
    char *word; /* The word */
    int count;  /* How many times it appears */
};

/* Function Prototypes */
char *get_word(FILE *filePointer); /* Function to get a word from a file */
void add_word(struct WordFreq ***wordFreqPointerPointer, char buf[], int *numWords); /* Function to add a word to the word frequency list */
int find_word(struct WordFreq **wordFreqPointer, char buf[], int size); /* Function to find a word in the word frequency list */
void bubble_sort(struct WordFreq **wordFreqPointer, int size); /* Function to sort the word frequency list */
int output_words(char outFileName[], struct WordFreq **wordFreqPointer, int size); /* Function to output words to a file */
char *my_strdup(const char *s); /* Function to duplicate a string */

/* Function Definitions */
char *get_word(FILE *filePointer) {
    int capacity = MAX_STRING_SIZE;
    int length = 0;
    char *word = (char *)malloc(capacity * sizeof(char)); /* Allocate memory for the word */
    char ch;
    char *temp; /* Temporary pointer for reallocating memory */

    if (word == NULL) {
        fprintf(stderr, "Memory allocation failed\n"); /* Print error message if memory allocation fails */
        return NULL;
    }

    ch = fgetc(filePointer);
    while (!isalpha(ch) && ch != EOF) { /* Skip non-alphabetic characters */
        ch = fgetc(filePointer);
    }

    while ((isalpha(ch) || isdigit(ch) || ch == '_') && ch != EOF) { /* Read the word character by character */
        if (length + 1 >= capacity) {
            capacity *= 2;
            temp = (char *)realloc(word, capacity * sizeof(char)); /* Resize memory if necessary */
            if (temp == NULL) {
                free(word);
                fprintf(stderr, "Memory reallocation failed\n"); /* Print error message if memory reallocation fails */
                return NULL;
            }
            word = temp;
        }
        word[length++] = ch;
        ch = fgetc(filePointer);
    }

    if (length == 0) {
        free(word);
        return NULL;
    }

    word[length] = '\0'; /* Null-terminate the word */
    return (char *)realloc(word, (length + 1) * sizeof(char)); /* Resize to fit the exact size of the word */
}

void add_word(struct WordFreq ***wordFreqPointerPointer, char buf[], int *numWords) {
    int index = find_word(*wordFreqPointerPointer, buf, *numWords);
    struct WordFreq *newWordFreq;
    struct WordFreq **newWordFreqPointerPointer;

    if (index != -1) {
        (*wordFreqPointerPointer)[index]->count++; /* Increment count if the word already exists */
    } else {
        newWordFreq = (struct WordFreq *)malloc(sizeof(struct WordFreq)); /* Allocate memory for a new WordFreq struct */
        if (newWordFreq == NULL) {
            fprintf(stderr, "Memory allocation failed for newWordFreq\n"); /* Print error message if memory allocation fails */
            return;
        }
        newWordFreq->word = my_strdup(buf); /* Duplicate the word */
        newWordFreq->count = 1;

        newWordFreqPointerPointer = (struct WordFreq **)realloc(*wordFreqPointerPointer, (*numWords + 1) * sizeof(struct WordFreq *));
        if (newWordFreqPointerPointer == NULL) {
            free(newWordFreq->word);
            free(newWordFreq);
            fprintf(stderr, "Memory reallocation failed\n"); /* Print error message if memory reallocation fails */
            return;
        }

        newWordFreqPointerPointer[*numWords] = newWordFreq; /* Add the new word to the list */
        *wordFreqPointerPointer = newWordFreqPointerPointer;
        (*numWords)++;
    }
}

int find_word(struct WordFreq **wordFreqPointer, char buf[], int size) {
    int i;
    for (i = 0; i < size; i++) {
        if (strcmp(wordFreqPointer[i]->word, buf) == 0) {
            return i; /* Return the index if the word is found */
        }
    }
    return -1; /* Return -1 if the word is not found */
}

void bubble_sort(struct WordFreq **wordFreqPointer, int size) {
    int i, j;
    for (i = 0; i < size - 1; i++) {
        for (j = 0; j < size - i - 1; j++) {
            if (wordFreqPointer[j]->count < wordFreqPointer[j + 1]->count ||
                (wordFreqPointer[j]->count == wordFreqPointer[j + 1]->count && strcmp(wordFreqPointer[j]->word, wordFreqPointer[j + 1]->word) > 0)) {
                struct WordFreq *temp = wordFreqPointer[j]; /* Swap if necessary to sort by count (and alphabetically if counts are equal) */
                wordFreqPointer[j] = wordFreqPointer[j + 1];
                wordFreqPointer[j + 1] = temp;
            }
        }
    }
}

int output_words(char outFileName[], struct WordFreq **wordFreqPointer, int size) {
    FILE *outFile = fopen(outFileName, "w");
    int i;
    if (!outFile) {
        fprintf(stderr, "Could not open output file %s\n", outFileName); /* Print error message if file opening fails */
        return 1;
    }

    for (i = 0; i < size; i++) {
        fprintf(outFile, "%s %d\n", wordFreqPointer[i]->word, wordFreqPointer[i]->count); /* Output word and count to the file */
    }
    fclose(outFile);
    return 0;
}

char *my_strdup(const char *s) {
    size_t size = strlen(s) + 1;
    char *p = malloc(size); /* Allocate memory for the duplicated string */
    if (p) {
        memcpy(p, s, size); /* Copy the string */
    }
    return p;
}

int main(int argc, char *argv[]) {
    FILE *inFile;
    struct WordFreq **wordList = NULL; /* List of word frequencies */
    char *word; /* Current word */
    int numWords = 0; /* Number of words */
    int i; /* Loop variable */

    if (argc != 3) {
        fprintf(stderr, "Usage: %s input_filename output_filename\n", argv[0]); /* Print usage message if incorrect number of arguments */
        return 1;
    }

    inFile = fopen(argv[1], "r");
    if (!inFile) {
        fprintf(stderr, "Could not open input file %s\n", argv[1]); /* Print error message if input file opening fails */
        return 1;
    }

    wordList = (struct WordFreq **)malloc(0 * sizeof(struct WordFreq *)); /* Initialize wordList */
    if (!wordList) {
        fprintf(stderr, "Failed to allocate memory for word list\n"); /* Print error message if memory allocation fails */
        fclose(inFile);
        return 1;
    }

    while ((word = get_word(inFile)) != NULL) {
        add_word(&wordList, word, &numWords); /* Add the word to the word frequency list */
        free(word); /* Free the word after adding it */
    }
    fclose(inFile); /* Close the input file after reading all words */

    bubble_sort(wordList, numWords); /* Sort the list of word frequencies */

    if (output_words(argv[2], wordList, numWords) != 0) {
        fprintf(stderr, "Error writing to output file %s\n", argv[2]); /* Print error message if writing to output file fails */
    }

    /* Cleanup: Free the dynamically allocated memory */
    for (i = 0; i < numWords; i++) {
        free(wordList[i]->word); /* Free the word string */
        free(wordList[i]);       /* Free the WordFreq struct */
    }
    free(wordList); /* Finally, free the list of WordFreq structs */

    return 0;
}
