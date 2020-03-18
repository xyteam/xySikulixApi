import java.util.Iterator;
import org.sikuli.script.Region;
import org.sikuli.script.Screen;
import org.sikuli.script.Pattern;
import org.sikuli.script.Match;

public class getTargetText {
    public static void main(String[] args) {

        // take args[0] as the sampleImage and args[1] as the sampleText
        String sampleImagePath = args[0];
        String sampleText = args[1];
        System.out.println("sampleImagePath : " + sampleImagePath);
        System.out.println("sampleText : " + sampleText);

	// define the entire Screen as the target region
        Region myScreen = new Screen();

	// take the sample image to define as image search pattern
        Pattern oneSample = (new Pattern(sampleImagePath)).similar(0.8);

        try {

            // use findAll to see the entire Screen
            Iterator<Match> find_results = myScreen.findAll(oneSample);

            // loop through all results
            while (find_results.hasNext()) {
                Region oneTarget = find_results.next().grow(0);
                String targetText = oneTarget.text();

                // check if the target contains sampleText,
                // if it does, we flash and print the match result
                if (targetText.contains(sampleText)) {
                    oneTarget.highlight(0.1);
                    System.out.println("targetText : " + targetText);
                }
            }
        } catch(Exception e) {
            System.out.println("err : " + e);
        }
    }
}
