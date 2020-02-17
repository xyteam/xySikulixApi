import java.util.Iterator;
import org.sikuli.script.Region;
import org.sikuli.script.Screen;
import org.sikuli.script.Pattern;
import org.sikuli.script.Match;

public class getTargetText {
    public static void main(String[] args) {
        // take first argument as sampleImage
        String sampleImagePath = args[0];
        String sampleText = args[1];
        System.out.println("sampleImagePath : " + sampleImagePath);
        System.out.println("sampleText : " + sampleText);

        Region findRegion = new Screen();
        Pattern oneSample = (new Pattern(sampleImagePath)).similar(0.8);

        try {
            Iterator<Match> find_results = findRegion.findAll(oneSample);
            while (find_results.hasNext()) {
                Match find_item = find_results.next();
                String find_text = find_item.text();
                if (find_text.contains(sampleText)) {
                    find_item.highlight(0.1);
                    System.out.println("find_text : " + find_text);
                }
            }
        } catch(Exception e) {
            System.out.println("err : " + e);
        }
    }
}
