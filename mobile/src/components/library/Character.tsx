import React from 'react';
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
import {RSize} from '../../utils/responsive';

const Character = ({personaje}: {personaje: number[]}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        key="background"
        style={{flex: 1}}
        imageStyle={{borderRadius: 80}}
        source={backgroundImages[`i${personaje[11]}`].uri}>
        <ImageBackground
          key="hair"
          style={{flex: 1}}
          imageStyle={{borderRadius: 80}}
          source={hairImages[`i${personaje[8]}`].uri}>
          <ImageBackground
            key="base"
            style={{flex: 1}}
            imageStyle={{borderRadius: 80}}
            source={baseImages[`i${personaje[0]}`].uri}>
            <ImageBackground
              key="vitiligo"
              style={{flex: 1}}
              imageStyle={[personaje[1] !== 0 ? {opacity: 1} : {opacity: 0}]}
              source={vitiligoImages[`i${personaje[1]}`].uri}>
              <ImageBackground
                key="lefteye"
                style={{flex: 1}}
                source={lefteyeImages[`i${personaje[2]}`].uri}>
                <ImageBackground
                  key="righteye"
                  style={{flex: 1}}
                  source={righteyeImages[`i${personaje[3]}`].uri}>
                  <ImageBackground
                    key="nose"
                    style={{flex: 1}}
                    source={noseImages[`i${personaje[4]}`].uri}>
                    <ImageBackground
                      key="mouth"
                      style={{flex: 1}}
                      source={mouthImages[`i${personaje[5]}`].uri}>
                      <ImageBackground
                        key="eyebrown"
                        style={{flex: 1}}
                        source={eyebrownImages[`i${personaje[6]}`].uri}>
                        <ImageBackground
                          key="clothes"
                          imageStyle={{borderRadius: 80}}
                          style={{flex: 1}}
                          source={clothesImages[`i${personaje[9]}`].uri}>
                          <ImageBackground
                            key="bangs"
                            imageStyle={{borderRadius: 80}}
                            style={{flex: 1}}
                            source={bangsImages[`i${personaje[7]}`].uri}>
                            <ImageBackground
                              key="accesories"
                              style={[
                                styles.container,
                                personaje[10] > 30
                                  ? {marginTop: RSize(0.05, 'h')}
                                  : {opacity: 1},
                              ]}
                              imageStyle={[
                                personaje[10] !== 0
                                  ? {opacity: 1, borderRadius: 80}
                                  : {opacity: 0},
                              ]}
                              source={accesoriesImages[`i${personaje[10]}`].uri}
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
