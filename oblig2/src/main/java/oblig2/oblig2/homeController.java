package oblig2.oblig2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class homeController {

    private final List<Billett> alleBilletter = new ArrayList<>();

    @PostMapping("/lagre")
    public void lagreBillett(Billett innbillett) {
        alleBilletter.add(innbillett);
    }

    @GetMapping("/hentBillett")
    public List<Billett> hentBillett() {
        return alleBilletter;
    }

    @GetMapping("/slettBilletter")
    public void slettAlle() {
        alleBilletter.clear();
    }
}
