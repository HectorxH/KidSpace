import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

import {baseImages} from '../../assets/perfil/1base/handler/baseImages';
import {vitiligoImages} from '../../assets/perfil/2vitiligo/handler/vitiligoImages';
import {lefteyeImages} from '../../assets/perfil/3lefteye/handler/lefteyeImages';
import {righteyeImages} from '../../assets/perfil/4righteye/handler/righteyeImages';
import {noseImages} from '../../assets/perfil/5nose/handler/noseImages';
import {mouthImages} from '../../assets/perfil/6mouth/handler/mouthImages';
import {eyebrownImages} from '../../assets/perfil/7eyebrown/handler/eyebrownImages';
import {bangsImages} from '../../assets/perfil/8bangs/handler/bangsImages';
import {hairImages} from '../../assets/perfil/9hair/handler/hairImages';
import {clothesImages} from '../../assets/perfil/10clothes/handler/clothesImages';
import {accesoriesImages} from '../../assets/perfil/11accesories/handler/accesoriesImages';
import {backgroundImages} from '../../assets/perfil/12background/handler/backgroundImages';

const Character = () => {
  const [base, setBase] = useState(5);
  const [vitiligo, setVitiligo] = useState(5);
  const [lefteye, setLefteye] = useState(1);
  const [righteye, setRighteye] = useState(1);
  const [nose, setNose] = useState(1);
  const [mouth, setMouth] = useState(1);
  const [eyebrown, setEyebrown] = useState(1);
  const [bangs, setBangs] = useState(110);
  const [hair, setHair] = useState(1);
  const [clothes, setClothes] = useState(6);
  const [accesories, setAccesories] = useState(35);
  const [background, setBackground] = useState(1);

  return (
    <View style={styles.container}>
      <ImageBackground
        key="background"
        imageStyle={{borderRadius: 80}}
        style={styles.container}
        source={backgroundImages[`i${background}`].uri}>
        <ImageBackground
          key="hair"
          style={styles.container}
          imageStyle={{borderRadius: 80}}
          source={hairImages[`i${hair}`].uri}>
          <ImageBackground
            key="base"
            style={styles.container}
            imageStyle={{borderRadius: 80}}
            source={baseImages[`i${base}`].uri}>
            <ImageBackground
              key="vitiligo"
              style={styles.container}
              source={vitiligoImages[`i${vitiligo}`].uri}>
              <ImageBackground
                key="lefteye"
                style={styles.container}
                source={lefteyeImages[`i${lefteye}`].uri}>
                <ImageBackground
                  key="righteye"
                  style={styles.container}
                  source={righteyeImages[`i${righteye}`].uri}>
                  <ImageBackground
                    key="nose"
                    style={styles.container}
                    source={noseImages[`i${nose}`].uri}>
                    <ImageBackground
                      key="mouth"
                      style={styles.container}
                      source={mouthImages[`i${mouth}`].uri}>
                      <ImageBackground
                        key="eyebrown"
                        style={styles.container}
                        source={eyebrownImages[`i${eyebrown}`].uri}>
                        <ImageBackground
                          key="clothes"
                          style={styles.container}
                          imageStyle={{borderRadius: 80}}
                          source={clothesImages[`i${clothes}`].uri}>
                          <ImageBackground
                            key="bangs"
                            style={styles.container}
                            source={bangsImages[`i${bangs}`].uri}>
                            <ImageBackground
                              key="accesories"
                              imageStyle={{borderRadius: 80}}
                              style={styles.container}
                              source={accesoriesImages[`i${accesories}`].uri}
                            />
                          </ImageBackground>
                        </ImageBackground>
                      </ImageBackground>
                    </ImageBackground>
                  </ImageBackground>
                </ImageBackground>
              </ImageBackground>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Character;
