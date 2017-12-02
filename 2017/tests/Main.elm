module Main exposing (suite)

import Expect
import OneA
import OneB
import Test exposing (..)
import TwoA
import TwoB


suite : Test
suite =
    describe "Advent of Code 2017"
        [ test "Day 1 A" <| \_ -> Expect.equal OneA.solution 1158
        , test "Day 1 B" <| \_ -> Expect.equal OneB.solution 1132
        , test "Day 2 A" <| \_ -> Expect.equal TwoA.solution 53978
        , test "Day 2 B" <| \_ -> Expect.equal TwoB.solution 314
        ]
