module Utils exposing (convertToIntList)


convertToIntList : List String -> List Int
convertToIntList =
    List.filterMap (String.toInt >> Result.toMaybe)
