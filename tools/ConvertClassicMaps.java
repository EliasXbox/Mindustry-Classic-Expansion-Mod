import java.awt.image.BufferedImage;
import java.nio.file.*;
import java.util.*;
import javax.imageio.ImageIO;
import io.anuke.ucore.noise.Noise;

/** Convert original RGBA map pixels using the archived Classic palette/noise. */
public class ConvertClassicMaps {
 static final Map<Integer,int[]> palette=new HashMap<>();
 static void add(int rgb,int floor,int wall){palette.put(rgb,new int[]{floor,wall});}
 static {add(0xff0000,10,0);add(0x00ff00,0,0);add(0x323232,0,0);add(0x646464,0,1);add(0x50965a,14,0);add(0x5ab464,14,2);add(0x506eb4,2,0);add(0x465a96,1,0);add(0x252525,5,0);add(0x575757,5,3);add(0x988a67,11,0);add(0xe5d8bb,11,4);add(0xc2d1d2,13,0);add(0xc4e3e7,12,0);add(0xf7feff,13,5);add(0x6e501e,10,0);add(0xed5334,3,0);add(0x292929,4,0);add(0xc3a490,6,0);add(0x161616,7,0);add(0x6277bc,8,0);add(0x83bc58,9,0);}
 public static void main(String[] args)throws Exception{
  Path source=Path.of(args[0]),output=Path.of(args[1]);int seed=Integer.parseInt(args[2]);
  BufferedImage image=ImageIO.read(source.toFile());int width=image.getWidth(),height=image.getHeight();int[] cells=new int[width*height];
  List<Integer> cores=new ArrayList<>(),spawns=new ArrayList<>(),targets=new ArrayList<>();Map<String,Integer> unknown=new TreeMap<>();
  Noise.setSeed(seed);Random decor=new Random(seed);int[] oreCounts=new int[4];
  for(int x=0;x<width;x++)for(int y=0;y<height;y++){
   int argb=image.getRGB(x,height-1-y),rgb=argb&0xffffff;int[] pair=(argb>>>24)==255?palette.get(rgb):null;int floor=pair==null?0:pair[0],wall=pair==null?0:pair[1],pos=y*width+x;
   if(rgb==0x00ff00)cores.add(pos);if(rgb==0xff0000)spawns.add(pos);if(rgb==0xa020f0)targets.add(pos);
   if(pair==null&&rgb!=0xa020f0)unknown.merge(String.format("%08x",argb),1,Integer::sum);
   if(wall==0&&decor.nextDouble()<.025){if(floor==0)wall=6;if(floor==13)wall=7;if(floor==14)wall=8;if(floor==5)wall=9;}
   if(floor==0||floor==14||floor==5||floor==13||floor==11){
    if(Noise.nnoise(x,y,8,1)>.21)floor=6;if(Noise.nnoise(x,y,6,1)>.237)floor=7;if(Noise.nnoise(x+9999,y+9999,8,1)>.27)floor=8;if(Noise.nnoise(x+99999,y+99999,7,1)>.259)floor=9;
   }
   if(rgb==0xa020f0)floor=0;
   if(floor>=6&&floor<=9)oreCounts[floor-6]++;
   cells[pos]=floor+wall*16;
  }
  if(cores.size()!=1)throw new IllegalStateException(source+" core markers="+cores.size());
  StringBuilder s=new StringBuilder("{\"width\":"+width+",\"height\":"+height+",\"seed\":"+seed+",\"core\":"+cores.get(0)+",\"spawns\":"+spawns+",\"targets\":"+targets+",\"oreCounts\":"+Arrays.toString(oreCounts)+",\"unknown\":{");boolean first=true;for(var e:unknown.entrySet()){if(!first)s.append(',');first=false;s.append('"').append(e.getKey()).append("\":").append(e.getValue());}s.append("},\"rle\":[");
  for(int i=0;i<cells.length;){int j=i+1;while(j<cells.length&&cells[j]==cells[i])j++;if(i>0)s.append(',');s.append(cells[i]).append(',').append(j-i);i=j;}s.append("]}\n");Files.createDirectories(output.getParent());Files.writeString(output,s);
  System.out.println(source.getFileName()+" "+width+"x"+height+" core="+cores.get(0)+" spawns="+spawns.size()+" ores="+Arrays.toString(oreCounts)+" unknown="+unknown);
 }
}
