import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class DFSMTabularTest {
    DFSMTabular dfsm;

    @Before
    public void setUp() throws Exception {
        dfsm = new DFSMTabular();
    }

    @Test
    public void test1() { assertTrue(dfsm.checkWord("a+b")); }

    @Test
    public void test2() {
        assertTrue(dfsm.checkWord("c(a+b)"));
    }

    @Test
    public void test3() { assertTrue(dfsm.checkWord("(a+b)(a+b)")); }

    @Test
    public void test4() { assertTrue(dfsm.checkWord("(a+b)(a+b)(a+b)")); }

    @Test
    public void test5() {
        assertTrue(dfsm.checkWord("(a+b)(a+b)(a+b)(a+b)"));
    }

    @Test
    public void test6() {
        assertFalse(dfsm.checkWord("a"));
    }

    @Test
    public void test7() {
        assertFalse(dfsm.checkWord("b"));
    }

    @Test
    public void test8() {
        assertFalse(dfsm.checkWord("a+"));
    }

    @Test
    public void test9() {
        assertFalse(dfsm.checkWord("aa+b"));
    }

    @Test
    public void test10() { assertFalse(dfsm.checkWord("(a+b)")); }

    @Test
    public void test11() { assertFalse(dfsm.checkWord("(a+b))")); }

    @Test
    public void test12() { assertFalse(dfsm.checkWord("(a+b)a+b")); }

    @Test
    public void test13() { assertFalse(dfsm.checkWord("(a+b)(ab)")); }

    @Test
    public void test14() { assertFalse(dfsm.checkWord("(a+b)(b+a)")); }

    @Test
    public void test15() { assertFalse(dfsm.checkWord("(a+b)c")); }

}
