module Utils exposing (convertToIntList, convertToJsonList)


convertToIntList : List String -> List Int
convertToIntList =
    List.filterMap (String.toInt >> Result.toMaybe)


convertToJsonList : String -> String
convertToJsonList =
    String.lines
        >> List.map stringPad
        >> String.join ","
        >> listPad


stringPad : String -> String
stringPad string =
    String.concat [ "\"", string, "\"" ]


listPad : String -> String
listPad string =
    String.concat [ "[", string, "]" ]
