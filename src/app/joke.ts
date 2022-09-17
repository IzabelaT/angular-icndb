

/**
 * One object of this class represents one Chuck Norris fact from icndb.
 */
export class Joke {

    /** Tag value for category. */
    public static readonly CATEGORY_NERDY = 'nerdy';

    /** Tag value for category, marks dirty jokes. */
    public static readonly CATEGORY_EXPLICIT = 'explicit';

    /** Actual text of the Chuck Norris fact. */
    private text = '';

    /** Number acting as primary key for the Joke in icndb. */
    private id = -1;

    /** Flag saying whether joke is marked with category/tag "nerdy". */
    private hasCategoryNerdy = false;

    /** Flag saying whether joke is marked with category/tag "explicit" (i.e. it is a dirty joke). */
    private hasCategoryExplicit = false;


    /**
     * Create a new joke based on text of joke and unique number.
     *
     * @param text  Text of joke
     * @param id  Unique ID of joke in icndb
     */
    constructor(text: string, id: number) {

        this.text = text;
        this.id   = id;
    }


    /**
     * Setter for text of joke.
     *
     * @param text  Text of Chuck Norris fact
     */
    public setText(text: string): void {

        this.text = text;
    }


    /**
     * Getter for text of joke.
     *
     * @return Actual text of Chuck Norris Fact.
     */
    public getText(): string {

        return this.text;
    }


    /**
     * Setter for primary key of joke in icndb.
     *
     * @param id  Unique ID of joke in icndb.
     */
    public setID(id: number): void {

        this.id = id;
    }


    /**
     * Getter for primary key of joke in icndb.
     *
     * @return  Unique ID of joke in icndb.
     */
    public getID(): number {

        return this.id;
    }


    /**
     * Method to check if joke is empty (i.e. contains no text) or not.
     *
     * @return true when text is null or an empty string.
     */
    public isEmpty(): boolean {

        return this.text == null || this.text === '';
    }


    /**
     * Method to check if joke contains text or not.
     *
     * @return true when text of joke is filled
     */
    public isFilled(): boolean {

        return this.text != null && this.text.length > 0;
    }


    /**
     * Set that joke is marked with category/tag "nerdy".
     */
    public setHasCategoryNerdy() {

        this.hasCategoryNerdy = true;
    }

    /**
     * Returns true iff joke is marked with category/tag "nerdy".
     */
    public getHasCategoryNerdy(): boolean {

        return this.hasCategoryNerdy;
    }


    /**
     * Set that joke is marked with category/tag "explicit" (i.e. it is a dirty joke).
     */
    public setHasCategoryExplicit() {

        this.hasCategoryExplicit = true;
    }


    /**
     * Returns true iff joke is marked with category/tag "explicit".
     */
    public getHasCategoryExplicit(): boolean {

        return this.hasCategoryExplicit;
    }


    /**
     * Method to build string representation of the object.
     *
     * @return  String representation of this object with ID and text of joke
     */
    public toString(): string  {

        return `Joke with ID ${this.id}: "${this.text}"`;
    }

}
