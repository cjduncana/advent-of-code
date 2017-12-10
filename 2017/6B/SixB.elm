module SixB exposing (solution)

import Array.Hamt as Array exposing (Array)
import Dict.LLRB as Dict exposing (Dict)


type alias Memory =
    Array Int


type alias PastMemory =
    Dict (List Int) Int


input : Memory
input =
    Array.fromList [ 0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11 ]


solution : Int
solution =
    steps 1 Dict.empty input


steps : Int -> PastMemory -> Memory -> Int
steps count past memory =
    let
        newMemory =
            normalizer memory

        memoryList =
            Array.toList newMemory
    in
        case Dict.get memoryList past of
            Just index ->
                count - index

            Nothing ->
                steps (count + 1) (Dict.insert memoryList count past) newMemory


normalizer : Memory -> Memory
normalizer memory =
    let
        ( _, index, quantity ) =
            Array.foldl findLargest ( 0, 0, 0 ) memory
    in
        Array.set index 0 memory
            |> spread (index + 1) quantity


findLargest : Int -> ( Int, Int, Int ) -> ( Int, Int, Int )
findLargest bank ( index, largestIndex, largest ) =
    let
        nextIndex =
            index + 1
    in
        if bank > largest then
            ( nextIndex, index, bank )
        else
            ( nextIndex, largestIndex, largest )


spread : Int -> Int -> Memory -> Memory
spread index remainder memory =
    if remainder <= 0 then
        memory
    else
        case Array.get index memory of
            Just bank ->
                Array.set index (bank + 1) memory
                    |> spread (index + 1) (remainder - 1)

            Nothing ->
                case Array.get 0 memory of
                    Just firstBank ->
                        Array.set 0 (firstBank + 1) memory
                            |> spread 1 (remainder - 1)

                    Nothing ->
                        memory
