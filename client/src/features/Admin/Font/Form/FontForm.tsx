import { ButtonPositive } from 'components/Button';
import Form from 'components/Form';
import Grid from 'components/Grid';
import { GridDivider, GridLayout } from 'components/Grid/style';
import InputText from 'components/InputText';
import InputTextArea from 'components/InputTextArea';
import Radio from 'components/Radio';
import React, { useState } from 'react';
import ImageFont from './ImageFont';
import WebFont from './WebFont';

type Props = {
  fontId: string;
};

const FontForm = ({ fontId }: Props) => {
  const [font, setFont] = useState<string>('');
  const [corporation, setCorporation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isWebFont, setIsWebFont] = useState<boolean>(true);

  console.log(fontId);

  const handleFontChange = (e) => {
    setFont(e.target.value);
  };
  const handleCorporationChange = (e) => {
    setCorporation(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleFontType = (isWebFont: boolean) => {
    setIsWebFont(isWebFont);
  };
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <section>
      <Form isGrey={true} onSubmit={handleSubmit}>
        <Grid gap={`36px 22px`} padding={`36px 24px`}>
          <GridLayout>
            <label htmlFor="name">
              Font name<span className="required"> *</span>
            </label>
            <InputText id="name" placeholder="text" value={font} onChange={handleFontChange} />
          </GridLayout>
          <GridLayout>
            <label>
              Corporation<span className="required"> *</span>
            </label>
            <InputText placeholder="text" value={corporation} onChange={handleCorporationChange} />
          </GridLayout>
          <GridLayout row={`1 / span 2`} column={`2 / span 1`}>
            <label htmlFor="description">Memo</label>
            <InputTextArea id="description" placeholder="text" value={description} onChange={handleDescriptionChange} />
          </GridLayout>
        </Grid>
        <GridDivider />
        <Grid gap={`36px 22px`} padding={`36px 24px`}>
          <GridLayout column={`span 2`}>
            <label>
              어떤 유형의 폰트를 추가하시겠습니까?<span className="required"> *</span>
            </label>
            <Radio>
              <input type="radio" name="fontType" id="webFont" value="true" checked={isWebFont} onChange={() => handleFontType(true)} />
              <label htmlFor="webFont">웹 폰트</label>
            </Radio>
            <Radio>
              <input type="radio" name="fontType" id="imageFont" value="false" checked={!isWebFont} onChange={() => handleFontType(false)} />
              <label htmlFor="imageFont">이미지 폰트</label>
            </Radio>
          </GridLayout>
        </Grid>
        <GridDivider />
        {isWebFont ? <WebFont /> : <ImageFont />}
        <GridDivider />
        <Grid template={`1fr`} padding={`36px 24px 56px 24px`}>
          <ButtonPositive enabled={true} text={`폰트 추가`} onClick={() => {}} />
        </Grid>
      </Form>
    </section>
  );
};

export default FontForm;
