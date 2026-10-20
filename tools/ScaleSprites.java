import java.awt.image.BufferedImage;
import java.nio.file.*;
import javax.imageio.ImageIO;

/** Reproduce and verify pixel-exact nearest-neighbor game assets, without smoothing. */
public class ScaleSprites {
    public static void main(String[] args) throws Exception {
        boolean verify = args.length > 0 && args[0].equals("--verify");
        Path root = Path.of(".");
        int count = 0;
        try(var paths = Files.walk(root.resolve("art-source"))) {
            for(Path source : paths.filter(p -> p.toString().endsWith(".png")).toList()) {
                Path relative = root.resolve("art-source").relativize(source);
                Path target = root.resolve("sprites").resolve(relative);
                BufferedImage original = ImageIO.read(source.toFile());
                int width = original.getWidth() * 4, height = original.getHeight() * 4;
                BufferedImage result;
                if(verify) {
                    result = ImageIO.read(target.toFile());
                    if(result.getWidth() != width || result.getHeight() != height)
                        throw new IllegalStateException("Wrong dimensions: " + target);
                } else {
                    result = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
                }
                for(int y = 0; y < height; y++) for(int x = 0; x < width; x++) {
                    int expected = original.getRGB(x / 4, y / 4);
                    if(verify && result.getRGB(x, y) != expected)
                        throw new IllegalStateException("Changed pixel: " + target + " " + x + "," + y);
                    if(!verify) result.setRGB(x, y, expected);
                }
                if(!verify) {
                    Files.createDirectories(target.getParent());
                    ImageIO.write(result, "png", target.toFile());
                }
                count++;
            }
        }
        System.out.println((verify ? "Verified " : "Scaled ") + count + " sprites at 4x, pixel for pixel.");
    }
}
