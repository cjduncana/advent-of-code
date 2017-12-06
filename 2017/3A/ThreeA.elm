module ThreeA exposing (solution)


input : Int
input =
    361527


solution : Int
solution =
    distanceFinder input


distanceFinder : Int -> Int
distanceFinder position =
    let
        level =
            toFloat position
                |> sqrt
                |> ceiling
                |> flip (//) 2

        sideLength =
            level * 2

        positionOnLevel =
            position - ((sideLength - 1) ^ 2)

        side =
            ceiling (toFloat positionOnLevel / toFloat sideLength) - 1

        positionOnSide =
            positionOnLevel - side * sideLength

        coords =
            if position <= 1 then
                ( 0, 0 )
            else if side == 0 then
                ( level, level - positionOnSide )
            else if side == 1 then
                ( level - positionOnSide, -level )
            else if side == 2 then
                ( -level, positionOnSide - level )
            else
                ( positionOnSide - level, level )
    in
        abs (Tuple.first coords) + abs (Tuple.second coords)
