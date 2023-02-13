import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ChevronDown } from 'react-feather';
import Algorithms from '../../../constants/Algorithms';

interface NavBarItemProps {
    title: string,
    subTitles: Array<Algorithms>
    setAlgo: React.Dispatch<React.SetStateAction<Algorithms>>
}

const Container = styled.div`
    color: white;
    display:flex;
    align-items: center;
    justify-content: center;
    text-transform:uppercase;
    width:120px;
    text-align: center;
    border:1px solid rgba(122, 122, 122, 0.1);
    font-size:12px;
    &:hover {
        background: rgba(0, 0, 0, 1);
    }

    transition: all 0.3s ease 0s;

    @media (max-width: 768px) {
        font-size: 8px;
        width:80px;
    }
`;

const UnorderedList = styled.ul`
    list-style: none;
    padding: 10px;
    margin: 0;
    text-align:center;
    width:100%;
`;

const ParentListItem = styled.li`
    list-style: none;
`;

interface ChildListItemProps {
    show: boolean,
    index: number
}

const ChildListItem = styled.li<ChildListItemProps>`
    position: absolute;
    list-style: none;
    display: none;
    white-space: nowrap;
    text-align:center;

    &:hover {
        background:rgba(75, 75, 75, 1);
        cursor: pointer;
        font-weight: bold;
    }
    ${({ show }) => show &&
    css`
      display: inline;
      background:#03191C;
    `}

  ${({ index }) =>
    css`
      width: 100%;
      padding:12px;
      top: ${(index * 30) + 12}px;
      left:-12px;

      transition: all 0.3s ease 0s;

        @media (max-width: 768px) {
            font-size: 8px;
            top: ${(index * 30) + 10}px;
        }
      
    `}
`;

const Chevron = styled(ChevronDown)`
    position:relative;
    top: 3px;
    margin-left: 5px;
`;

const ChildUnorderedList = styled.ul`
    position: relative;
`;

const NavBarItem : React.FC<NavBarItemProps> = ({ title ,subTitles, setAlgo}) => {
    
    const [isHovered, setHovered] = useState(false);

    return (
        <Container
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <UnorderedList>
                <ParentListItem>
                    {title}
                    <Chevron size={12}/>
                    <ChildUnorderedList>
                        {
                            subTitles.map((subtitle : Algorithms, index) => 
                        <ChildListItem 
                            key={index}
                            index={index}
                            show={isHovered}
                            onClick={() => setAlgo(subtitle)}
                        >
                            {subtitle.toString()}
                        </ChildListItem>)
                        }
                    </ChildUnorderedList>
                </ParentListItem>
            </UnorderedList>
        </Container>
    );
};

export default NavBarItem;