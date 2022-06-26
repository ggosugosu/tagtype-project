import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import ModalSVG from 'assets/images/modal_archive.svg';
import CloseSVG from 'assets/images/ic_close.svg';
import HighlightButton, { HighlightButtonOption } from 'components/HighlightButton';
import { useQuery } from '@apollo/client';
import { GET_FONT_BY_FONT_ID } from './gql';
import { main } from 'common/colors';

interface Props {
  id: Number;
  handleVisible: () => void;
}

interface ItemProps {
  name: String;
  selected: Boolean;
  onClick: () => void;
  option?: HighlightButtonOption;
}

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 446px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 446px);
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const ModalWrapper = styled.div`
  position: relative;
  width: 396px;
  height: 598px;
`;
export const ModalContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 396px;
  height: 598px;
`;

const ContainerTagsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 354px;
  height: 328px;
  padding: 4px;
  overflow: auto;
`;

const ModalItem = ({ name, selected, onClick, option }: ItemProps) => {
  return <HighlightButton name={name} selected={selected} onClick={onClick} option={option} />;
};

const ContainerTags = ({ children }) => {
  return <ContainerTagsWrapper>{children}</ContainerTagsWrapper>;
};

export default function ArchiveItemModal({ id, handleVisible }: Props) {
  const { loading, error, data } = useQuery(GET_FONT_BY_FONT_ID, { variables: { font_id: 3 } });
  if (loading || error) return null;

  return (
    <ModalBackground onClick={handleVisible}>
      <ModalWrapper>
        <Image alt="modal_background" src={ModalSVG} />
        <ModalContentWrapper>
          <Image alt="btn_close" src={CloseSVG} onClick={handleVisible} />
          <div>이미지</div>
          <span>Detail View</span>
          <hr />
          <ContainerTags>
            <ModalItem key={-1} name={'추가하기'} selected={false} onClick={() => {}} option={{ textColor: `${main}`, underline: true }} />
            {data &&
              data.getTagAll.map((item, index) => (
                <ModalItem
                  key={index}
                  name={item.name}
                  selected={data.getFontByFontId.fontTags.map((fontTag) => fontTag.tags.id).includes(item.id)}
                  onClick={() => {}}
                />
              ))}
          </ContainerTags>
        </ModalContentWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
}
