package app.indusara.server.validator;

public enum Position {
    first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, participation;

    public Position getPosition(Integer positionNumber) {
        return switch (positionNumber) {
            case 1 -> first;
            case 2 -> second;
            case 3 -> third;
            case 4 -> fourth;
            case 5 -> fifth;
            case 6 -> sixth;
            case 7 -> seventh;
            case 8 -> eighth;
            case 9 -> ninth;
            case 10 -> tenth;
            default -> participation;
        };
    }
}
