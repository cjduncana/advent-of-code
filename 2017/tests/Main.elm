module Main exposing (suite)

import Expect
import FiveA
import FiveB
import FourA
import FourB
import OneA
import OneB
import SevenA
import SixA
import SixB
import Test exposing (..)
import ThreeA
import TwoA
import TwoB


suite : Test
suite =
    describe "Advent of Code 2017"
        [ test "Day 1 A" <| \_ -> Expect.equal OneA.solution 1158
        , test "Day 1 B" <| \_ -> Expect.equal OneB.solution 1132
        , test "Day 2 A" <| \_ -> Expect.equal TwoA.solution 53978
        , test "Day 2 B" <| \_ -> Expect.equal TwoB.solution 314
        , test "Day 3 A" <| \_ -> Expect.equal ThreeA.solution 326
        , test "Day 4 A" <| \_ -> Expect.equal FourA.solution 466
        , test "Day 4 B" <| \_ -> Expect.equal FourB.solution 251
        , test "Day 5 A" <| \_ -> Expect.equal FiveA.solution 394829
        , test "Day 5 B" <| \_ -> Expect.equal FiveB.solution 31150702
        , test "Day 6 A" <| \_ -> Expect.equal SixA.solution 7864
        , test "Day 6 B" <| \_ -> Expect.equal SixB.solution 1695
        , test "Day 7 A" <| \_ -> Expect.equal SevenA.solution "dgoocsw"
        ]
